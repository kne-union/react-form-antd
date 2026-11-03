import React, {forwardRef} from 'react';
import classnames from 'classnames';
import {useIsMobile} from '@kne/responsive-utils';
import './style.scss';

const MOBILE_STEPPER_CLASS = 'react-form-antd-mobile-stepper';

const withMobileStepper = WrappedComponent => {
    const MobileStepper = forwardRef((props, ref) => {
        const isMobile = useIsMobile();
        if (!isMobile) {
            return <WrappedComponent ref={ref} {...props} />;
        }
        return <WrappedComponent ref={ref} {...props} mode={props.mode || 'spinner'}
                                 className={classnames(props.className, MOBILE_STEPPER_CLASS)} />;
    });

    MobileStepper.displayName = `withMobileStepper(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    return MobileStepper;
};

export default withMobileStepper;
