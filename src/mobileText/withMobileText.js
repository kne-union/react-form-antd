import React, {forwardRef} from 'react';
import classnames from 'classnames';
import {useIsMobile} from '@kne/responsive-utils';
import './style.scss';

const MOBILE_TEXT_CLASS = 'react-form-antd-mobile-text';

const withMobileText = WrappedComponent => {
    const MobileText = forwardRef((props, ref) => {
        const isMobile = useIsMobile();
        return <WrappedComponent ref={ref} {...props} className={classnames(props.className, isMobile && MOBILE_TEXT_CLASS)} />;
    });

    MobileText.displayName = `withMobileText(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    return MobileText;
};

export default withMobileText;
