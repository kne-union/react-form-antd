import React, {forwardRef} from 'react';
import classnames from 'classnames';
import useMobileFieldPopup from './useMobileFieldPopup';

const withMobilePopup = (WrappedComponent, options = {}) => {
    const MobilePopupField = forwardRef((props, ref) => {
        const {disableMobilePopup, ...rest} = props;
        const {isMobile, mask, popupProps, setAnchor} = useMobileFieldPopup(Object.assign({}, options, {
            disabled: disableMobilePopup,
            open: rest.open,
            onOpenChange: rest.onOpenChange,
            onDropdownVisibleChange: rest.onDropdownVisibleChange,
            getPopupContainer: rest.getPopupContainer,
            classNames: rest.classNames,
            styles: rest.styles,
            popupClassName: rest.popupClassName,
            dropdownClassName: rest.dropdownClassName,
            popupStyle: rest.popupStyle,
            dropdownStyle: rest.dropdownStyle,
            placement: rest.placement,
            zIndex: rest.zIndex,
            inputReadOnly: rest.inputReadOnly,
            popupMatchSelectWidth: rest.popupMatchSelectWidth,
            listHeight: rest.listHeight
        }));

        return <>
            {mask}
            <span ref={setAnchor} className={classnames('react-form-antd-mobile-anchor', isMobile && 'is-mobile')}>
                <WrappedComponent ref={ref} {...rest} {...(isMobile ? popupProps : null)} />
            </span>
        </>;
    });

    MobilePopupField.displayName = `withMobilePopup(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    Object.keys(WrappedComponent).forEach(key => {
        if (key === '$$typeof' || key === 'prototype' || key === 'render') {
            return;
        }
        try {
            MobilePopupField[key] = WrappedComponent[key];
        } catch {
            // 部分组件静态属性只读，跳过即可
        }
    });

    return MobilePopupField;
};

export default withMobilePopup;
