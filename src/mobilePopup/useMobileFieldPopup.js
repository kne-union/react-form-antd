import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import classnames from 'classnames';
import {useZIndex} from 'antd/es/_util/hooks';
import {MOBILE_POPUP_COVER, MOBILE_POPUP_MODE, usePopupMount, useScrollElement} from '@kne/responsive-utils';
import getMobilePopupMetrics from './getMobilePopupMetrics';
import './style.scss';

const MOBILE_MASK_Z_INDEX = 1000;
const MOBILE_POPUP_Z_INDEX = 1050;
const MASK_ANIMATION_DURATION = 180;
const POPUP_OFFSET = 4;
const PICKER_FIELD_GAP = 8;
const MIN_LIST_HEIGHT = 160;
const POPUP_CLASS = 'react-form-antd-mobile-popup';
const HEIGHT_VAR = '--react-form-antd-mobile-popup-height';
const TOP_VAR = '--react-form-antd-mobile-popup-top';
const BOTTOM_VAR = '--react-form-antd-mobile-popup-bottom';

const TRIGGER_SELECTOR = '.ant-select, .ant-picker, .ant-cascader, .ant-tree-select';
/** DatePickerToday：可见输入行，避免量到隐藏的 0 尺寸 .ant-picker */
const VISIBLE_FIELD_SELECTOR = '.date-picker-today-inputs';

/** Modal 内对齐 antd 弹层：z-index 只走 JS，SCSS 不要写 z-index !important */
const resolveMobileSheetZIndex = popupZIndex => {
    if (popupZIndex == null) {
        return {maskZIndex: MOBILE_MASK_Z_INDEX, panelZIndex: MOBILE_POPUP_Z_INDEX};
    }
    return {maskZIndex: popupZIndex - 1, panelZIndex: popupZIndex};
};

const isMeasurableField = node => {
    if (!node || typeof node.getBoundingClientRect !== 'function') {
        return false;
    }
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
};

/** 收集触发节点的可滚动祖先，保证弹层能跟着输入框滚动（含 simplebar / kne-responsive-scroll） */
const collectScrollParents = element => {
    const list = [];
    if (typeof window === 'undefined' || !element) {
        return list;
    }
    let current = element.parentElement;
    while (current) {
        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY;
        const overflowX = style.overflowX;
        if (['auto', 'scroll', 'overlay'].includes(overflowY) || ['auto', 'scroll', 'overlay'].includes(overflowX)) {
            list.push(current);
        }
        current = current.parentElement;
    }
    return list;
};

const mergeClassNames = (classNames, popupClassName) => {
    return Object.assign({}, classNames, {
        popup: Object.assign({}, classNames?.popup, {
            root: classnames(classNames?.popup?.root, popupClassName)
        })
    });
};

const mergeStyles = (styles, popupStyle) => {
    return Object.assign({}, styles, {
        popup: Object.assign({}, styles?.popup, {
            root: Object.assign({}, styles?.popup?.root, popupStyle)
        })
    });
};

const useMobileFieldPopup = ({
    kind = 'select',
    disabled = false,
    unlockTriggerWidth = false,
    syncListHeight = false,
    dropdownVisibleEvent = false,
    anchorRef: anchorRefProp,
    open: openProp,
    onOpenChange,
    onDropdownVisibleChange,
    getPopupContainer: getPopupContainerProp,
    classNames: classNamesProp,
    styles: stylesProp,
    popupClassName,
    dropdownClassName,
    popupStyle,
    dropdownStyle,
    placement,
    zIndex,
    inputReadOnly,
    popupMatchSelectWidth,
    listHeight
} = {}) => {
    const controlled = openProp !== undefined;
    const [innerOpen, setInnerOpen] = useState(false);
    const open = controlled ? openProp : innerOpen;
    const [renderMask, setRenderMask] = useState(false);
    const [maskClosing, setMaskClosing] = useState(false);
    const [popupMetrics, setPopupMetrics] = useState({top: 0, left: 0, height: 0, width: 0});
    const anchorNodeRef = useRef(null);
    const triggerRef = useRef(null);
    const maskRef = useRef(null);

    const zIndexType = kind === 'picker' || kind === 'range-picker' ? 'DatePicker' : 'SelectLike';
    const [antdPopupZIndex] = useZIndex(zIndexType, zIndex);
    const {maskZIndex, panelZIndex} = resolveMobileSheetZIndex(antdPopupZIndex);

    const {isMobile: popupIsMobile, fixedModeClass, getPopupContainer, getMountNode, anchorRef} = usePopupMount({
        cover: MOBILE_POPUP_COVER.viewport
    });
    const isMobile = !disabled && popupIsMobile;
    const useBoundaryMount = fixedModeClass === MOBILE_POPUP_MODE.boundary;
    const getScrollElement = useScrollElement();

    const setAnchor = useCallback(node => {
        anchorNodeRef.current = node;
        anchorRef(node);
    }, [anchorRef]);

    const measureTrigger = useCallback(() => {
        const findFieldEl = node => {
            if (!node || typeof node.getBoundingClientRect !== 'function') {
                return null;
            }
            // DatePickerToday：量可见输入行，不要落到隐藏的 0×0 .ant-picker
            const visibleField = node.matches?.(VISIBLE_FIELD_SELECTOR)
                ? node
                : node.querySelector?.(VISIBLE_FIELD_SELECTOR);
            if (isMeasurableField(visibleField)) {
                return visibleField;
            }
            if (node.matches?.(TRIGGER_SELECTOR) && isMeasurableField(node)) {
                return node;
            }
            const candidates = node.querySelectorAll?.(TRIGGER_SELECTOR);
            if (candidates?.length) {
                for (let i = 0; i < candidates.length; i += 1) {
                    if (isMeasurableField(candidates[i])) {
                        return candidates[i];
                    }
                }
            }
            return null;
        };

        // 优先用字段锚点上的控件，避免 getPopupContainer 传入的 trigger 被污染后量到错误节点
        const fromAnchor = findFieldEl(anchorNodeRef.current) || findFieldEl(anchorRefProp?.current);
        if (fromAnchor) {
            return fromAnchor;
        }
        if (triggerRef.current && isMeasurableField(triggerRef.current)) {
            return triggerRef.current;
        }
        // 外部锚点本身可量（如 DatePickerToday 容器）时退回锚点
        const external = anchorRefProp?.current;
        if (isMeasurableField(external)) {
            return external;
        }
        if (isMeasurableField(anchorNodeRef.current)) {
            return anchorNodeRef.current;
        }
        return null;
    }, [anchorRefProp]);

    const updatePopupMetrics = useCallback(() => {
        const triggerEl = measureTrigger();
        if (!triggerEl) {
            return;
        }
        const isPickerKind = kind === 'picker' || kind === 'range-picker';
        const direction = typeof placement === 'string' && placement.startsWith('top') ? 'top' : typeof placement === 'string' && placement.startsWith('bottom') ? 'bottom' : 'auto';
        const metrics = getMobilePopupMetrics(triggerEl, {
            scrollEl: getScrollElement(),
            boundaryEl: getMountNode(triggerEl),
            useBoundaryMount,
            offset: isPickerKind ? PICKER_FIELD_GAP : POPUP_OFFSET,
            allowFlip: isPickerKind || kind === 'select',
            direction
        });
        setPopupMetrics(prev => {
            if (prev.top === metrics.top && prev.left === metrics.left && prev.height === metrics.height && prev.width === metrics.width && prev.placement === metrics.placement && prev.bottom === metrics.bottom && prev.maskTop === metrics.maskTop && prev.maskHeight === metrics.maskHeight) {
                return prev;
            }
            return metrics;
        });
    }, [getMountNode, getScrollElement, kind, measureTrigger, placement, useBoundaryMount]);

    // 始终把外部锚点交给 usePopupMount（示例手机框探测依赖它；不能等 isMobile 已为 true）
    useLayoutEffect(() => {
        const external = anchorRefProp?.current;
        if (external) {
            anchorRef(external);
            anchorNodeRef.current = external;
        }
    }, [anchorRef, anchorRefProp, open]);

    useLayoutEffect(() => {
        if (!isMobile || !open) {
            return undefined;
        }
        updatePopupMetrics();
    }, [isMobile, open, updatePopupMetrics]);

    useEffect(() => {
        if (!isMobile || !open) {
            return undefined;
        }
        updatePopupMetrics();
        const handleChange = () => updatePopupMetrics();
        const scrollTargets = new Set();
        const contextScrollEl = getScrollElement();
        if (contextScrollEl) {
            scrollTargets.add(contextScrollEl);
        }
        if (typeof document !== 'undefined') {
            if (document.scrollingElement) {
                scrollTargets.add(document.scrollingElement);
            }
            if (document.documentElement) {
                scrollTargets.add(document.documentElement);
            }
        }
        const triggerEl = measureTrigger();
        collectScrollParents(triggerEl).forEach(el => scrollTargets.add(el));
        // capture：document/window 滚动不冒泡，必须在捕获阶段才能收到；也能覆盖内部滚动容器
        scrollTargets.forEach(el => {
            el.addEventListener('scroll', handleChange, {passive: true, capture: true});
        });
        window.addEventListener('scroll', handleChange, {passive: true, capture: true});
        window.addEventListener('resize', handleChange);
        window.visualViewport?.addEventListener('resize', handleChange);
        window.visualViewport?.addEventListener('scroll', handleChange);
        let resizeObserver;
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(handleChange);
            scrollTargets.forEach(el => resizeObserver.observe(el));
            if (triggerEl) {
                resizeObserver.observe(triggerEl);
            }
        }
        return () => {
            scrollTargets.forEach(el => {
                el.removeEventListener('scroll', handleChange, {capture: true});
            });
            window.removeEventListener('scroll', handleChange, {capture: true});
            window.removeEventListener('resize', handleChange);
            window.visualViewport?.removeEventListener('resize', handleChange);
            window.visualViewport?.removeEventListener('scroll', handleChange);
            resizeObserver?.disconnect();
        };
    }, [getScrollElement, isMobile, measureTrigger, open, updatePopupMetrics]);

    // 朝上展开时：遮罩下沿对齐弹层底边，且绝不盖住 Field（短列表时 spaceAbove 远大于弹层高度）
    useLayoutEffect(() => {
        if (!isMobile || !open || popupMetrics.placement !== 'top') {
            return undefined;
        }
        const frame = requestAnimationFrame(() => {
            const triggerEl = measureTrigger();
            if (!triggerEl) {
                return;
            }
            const gap = kind === 'picker' || kind === 'range-picker' ? PICKER_FIELD_GAP : POPUP_OFFSET;
            const triggerRect = triggerEl.getBoundingClientRect();
            const mountNode = getMountNode(triggerEl) || (typeof document !== 'undefined' ? document.body : null);
            if (!mountNode) {
                return;
            }
            const fieldLimit = triggerRect.top - gap;
            let maskBottom = fieldLimit;
            const popups = mountNode.querySelectorAll('.react-form-antd-mobile-popup.is-above');
            popups.forEach(popup => {
                if (popup.classList.contains('ant-select-dropdown-hidden') || popup.classList.contains('ant-picker-dropdown-hidden') || popup.classList.contains('ant-cascader-dropdown-hidden')) {
                    return;
                }
                if (getComputedStyle(popup).display === 'none') {
                    return;
                }
                const popupRect = popup.getBoundingClientRect();
                if (popupRect.height <= 0) {
                    return;
                }
                // 只收紧「弹在当前 Field 上方」的弹层
                if (popupRect.bottom <= triggerRect.top + 2 && popupRect.bottom > (popupMetrics.maskTop || 0)) {
                    maskBottom = Math.min(maskBottom, popupRect.bottom);
                }
            });
            const maskTop = Math.max(popupMetrics.maskTop || 0, 0);
            const nextHeight = Math.max(maskBottom - maskTop, 0);
            if (Math.abs(nextHeight - (popupMetrics.maskHeight || 0)) < 1) {
                return;
            }
            setPopupMetrics(prev => {
                if (prev.placement !== 'top') {
                    return prev;
                }
                if (Math.abs((prev.maskHeight || 0) - nextHeight) < 1) {
                    return prev;
                }
                return Object.assign({}, prev, {maskHeight: nextHeight});
            });
        });
        return () => cancelAnimationFrame(frame);
    }, [getMountNode, isMobile, kind, measureTrigger, open, popupMetrics.bottom, popupMetrics.height, popupMetrics.maskHeight, popupMetrics.maskTop, popupMetrics.placement, popupMetrics.top]);

    useEffect(() => {
        if (open && isMobile) {
            setRenderMask(true);
            setMaskClosing(false);
            return undefined;
        }
        if (!renderMask) {
            return undefined;
        }
        setMaskClosing(true);
        const timer = setTimeout(() => {
            setRenderMask(false);
            setMaskClosing(false);
        }, MASK_ANIMATION_DURATION);
        return () => clearTimeout(timer);
    }, [isMobile, open, renderMask]);

    useEffect(() => {
        const el = maskRef.current;
        if (!el) {
            return undefined;
        }
        const block = event => event.preventDefault();
        el.addEventListener('touchmove', block, {passive: false});
        return () => el.removeEventListener('touchmove', block);
    }, [renderMask, maskClosing]);

    const emitOpenChange = useCallback(next => {
        if (!controlled) {
            setInnerOpen(next);
        }
        if (next && isMobile) {
            updatePopupMetrics();
        }
        onOpenChange && onOpenChange(next);
        onDropdownVisibleChange && onDropdownVisibleChange(next);
    }, [controlled, isMobile, onDropdownVisibleChange, onOpenChange, updatePopupMetrics]);

    const close = useCallback(() => {
        emitOpenChange(false);
    }, [emitOpenChange]);

    const resolveGetPopupContainer = useCallback(triggerNode => {
        if (triggerNode) {
            triggerRef.current = triggerNode;
        }
        if (!isMobile && typeof getPopupContainerProp === 'function') {
            return getPopupContainerProp(triggerNode);
        }
        return getPopupContainer(triggerNode) || (typeof document !== 'undefined' ? document.body : null);
    }, [getPopupContainer, getPopupContainerProp, isMobile]);

    const popupMountNode = typeof document !== 'undefined' ? getMountNode() || document.body : null;
    const modeClass = fixedModeClass || (isMobile ? MOBILE_POPUP_MODE.viewport : null);
    const isPickerKind = kind === 'picker' || kind === 'range-picker';
    const openAbove = popupMetrics.placement === 'top';
    const popupClass = classnames(POPUP_CLASS, modeClass, kind === 'picker' && 'is-picker', kind === 'range-picker' && 'is-range', openAbove && 'is-above');

    const mobilePopupStyle = {
        [HEIGHT_VAR]: popupMetrics.height > 0 ? `${popupMetrics.height}px` : undefined,
        [TOP_VAR]: `${popupMetrics.top}px`,
        [BOTTOM_VAR]: openAbove ? `${popupMetrics.bottom}px` : undefined,
        top: openAbove ? 'auto' : popupMetrics.top,
        bottom: openAbove ? popupMetrics.bottom : undefined,
        left: popupMetrics.left ?? 0,
        zIndex: panelZIndex
    };

    const mergedPopupStyle = Object.assign({}, popupStyle, dropdownStyle, mobilePopupStyle);

    let popupProps = {};
    if (isMobile) {
        popupProps = {
            open,
            onOpenChange: emitOpenChange,
            getPopupContainer: resolveGetPopupContainer,
            placement: placement || (openAbove ? 'topLeft' : 'bottomLeft'),
            // 位置由我们按可用空间计算，禁止 antd 再自动翻转，否则遮罩会和弹层错位
            autoAdjustOverflow: false,
            transitionName: '',
            popupClassName: classnames(popupClassName, popupClass),
            dropdownClassName: classnames(dropdownClassName, popupClass),
            popupStyle: mergedPopupStyle,
            dropdownStyle: mergedPopupStyle,
            classNames: mergeClassNames(classNamesProp, popupClass),
            styles: mergeStyles(stylesProp, mobilePopupStyle)
        };
        if (dropdownVisibleEvent) {
            popupProps.onDropdownVisibleChange = emitOpenChange;
        }
        if (kind === 'picker' || kind === 'range-picker') {
            popupProps.inputReadOnly = inputReadOnly !== undefined ? inputReadOnly : true;
        }
        if (unlockTriggerWidth) {
            popupProps.popupMatchSelectWidth = popupMatchSelectWidth != null ? popupMatchSelectWidth : false;
        }
        if (syncListHeight && popupMetrics.height > 0 && listHeight == null) {
            popupProps.listHeight = Math.max(popupMetrics.height - 8, MIN_LIST_HEIGHT);
        }
    }

    const mask = isMobile && renderMask && popupMountNode ? createPortal(
        <div
            ref={maskRef}
            className={classnames('react-form-antd-mobile-mask', modeClass, maskClosing && 'is-leave')}
            style={openAbove ? {
                top: popupMetrics.maskTop,
                height: popupMetrics.maskHeight,
                zIndex: maskZIndex
            } : {
                top: popupMetrics.top,
                height: popupMetrics.height,
                zIndex: maskZIndex
            }}
            onClick={close}
        />,
        popupMountNode
    ) : null;

    return {
        isMobile,
        mask,
        popupProps,
        setAnchor
    };
};

export default useMobileFieldPopup;
