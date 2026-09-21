const MIN_MOBILE_POPUP_HEIGHT = 160;
const PICKER_MIN_HEIGHT = 280;

const resolveDirection = ({allowFlip, direction, spaceAbove, spaceBelow}) => {
    if (direction === 'top') {
        return 'top';
    }
    if (direction === 'bottom' || !allowFlip) {
        return 'bottom';
    }
    if (spaceBelow < PICKER_MIN_HEIGHT && spaceAbove > spaceBelow) {
        return 'top';
    }
    return 'bottom';
};

const isDocumentScroller = scrollEl => {
    if (!scrollEl || typeof document === 'undefined') {
        return true;
    }
    return scrollEl === document.documentElement
        || scrollEl === document.body
        || scrollEl === document.scrollingElement;
};

/**
 * fixed（kne-is-viewport）弹层必须以「当前视口」为可见区。
 * 页面上常有带 kne-responsive-scroll 但实际不滚的节点；用它的 getBoundingClientRect
 * 会在 document 已滚动时得到很大的负数 top，算出几千 px 的遮罩。
 * 仅当 scrollEl 本身在视口内裁剪、且高度接近视口时，才用其矩形。
 */
const getFixedVisibleArea = scrollEl => {
    const viewportTop = typeof window.visualViewport?.offsetTop === 'number'
        ? window.visualViewport.offsetTop
        : 0;
    const viewportHeight = typeof window.visualViewport?.height === 'number'
        ? window.visualViewport.height
        : window.innerHeight;
    const viewportBottom = viewportTop + viewportHeight;
    const viewportWidth = typeof window.visualViewport?.width === 'number'
        ? window.visualViewport.width
        : window.innerWidth;

    if (!scrollEl || isDocumentScroller(scrollEl)) {
        return {top: viewportTop, bottom: viewportBottom, width: viewportWidth};
    }

    const scrollRect = scrollEl.getBoundingClientRect();
    const clipsViewport = scrollEl.clientHeight > 0
        && scrollEl.clientHeight <= viewportHeight * 1.15
        && scrollRect.height <= viewportHeight * 1.15
        && scrollRect.bottom > viewportTop
        && scrollRect.top < viewportBottom;

    if (!clipsViewport) {
        return {top: viewportTop, bottom: viewportBottom, width: viewportWidth};
    }

    return {
        top: Math.max(scrollRect.top, viewportTop),
        bottom: Math.min(scrollRect.bottom, viewportBottom),
        width: scrollRect.width || viewportWidth
    };
};

/**
 * 计算移动端弹层位置。
 * 选择类、日期/时间在下方空间不够、上方更宽裕时改为向上展开。
 * 页面底部时 scrollEl 可见底边可能紧贴 trigger，不能只信 scrollRect.bottom。
 */
const getMobilePopupMetrics = (triggerEl, {scrollEl, boundaryEl, useBoundaryMount, offset = 4, allowFlip = false, direction = 'auto'} = {}) => {
    if (typeof window === 'undefined' || !triggerEl) {
        return {top: 0, left: 0, height: 0, width: 0, placement: 'bottom'};
    }

    const rect = triggerEl.getBoundingClientRect();

    if (useBoundaryMount && boundaryEl) {
        const boundaryRect = boundaryEl.getBoundingClientRect();
        const spaceAbove = Math.max(rect.top - boundaryRect.top - offset, 0);
        const spaceBelow = Math.max(boundaryRect.bottom - rect.bottom - offset, 0);
        const placement = resolveDirection({allowFlip, direction, spaceAbove, spaceBelow});

        if (placement === 'top') {
            return {
                placement,
                top: 0,
                bottom: Math.max(boundaryRect.bottom - rect.top + offset, 0),
                left: 0,
                height: spaceAbove,
                width: boundaryRect.width,
                maskTop: 0,
                maskHeight: Math.max(rect.top - boundaryRect.top - offset, 0)
            };
        }

        const top = Math.max(rect.bottom - boundaryRect.top + offset, 0);
        const available = Math.max(boundaryRect.height - top, 0);
        const height = available >= MIN_MOBILE_POPUP_HEIGHT ? available : Math.max(available, Math.min(MIN_MOBILE_POPUP_HEIGHT, boundaryRect.height - offset));

        return {
            placement,
            top,
            left: 0,
            height,
            width: boundaryRect.width
        };
    }

    const {top: visibleTop, bottom: visibleBottom, width} = getFixedVisibleArea(scrollEl);
    const spaceAbove = Math.max(rect.top - visibleTop - offset, 0);
    const spaceBelow = Math.max(visibleBottom - rect.bottom - offset, 0);
    const placement = resolveDirection({allowFlip, direction, spaceAbove, spaceBelow});

    if (placement === 'top') {
        const maskHeight = Math.max(rect.top - visibleTop - offset, 0);
        return {
            placement,
            top: 0,
            bottom: Math.max(window.innerHeight - rect.top + offset, 0),
            left: 0,
            height: spaceAbove,
            width,
            maskTop: Math.max(visibleTop, 0),
            // 绝不超过当前可视区，避免误用错误 scrollEl 矩形时出现数千 px 遮罩
            maskHeight: Math.min(maskHeight, Math.max(visibleBottom - visibleTop, 0))
        };
    }

    const top = Math.max(rect.bottom + offset, visibleTop);
    const available = Math.max(visibleBottom - top, 0);
    const height = available >= MIN_MOBILE_POPUP_HEIGHT ? available : Math.max(available, Math.min(MIN_MOBILE_POPUP_HEIGHT, visibleBottom - top));

    return {
        placement,
        top,
        left: 0,
        height: Math.max(height, 0),
        width
    };
};

export default getMobilePopupMetrics;
