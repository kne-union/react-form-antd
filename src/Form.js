import React, {forwardRef} from 'react';
import classnames from 'classnames';
import ReactForm from '@kne/react-form';
import {widget} from '@kne/react-form-helper';
import {useIsMobile} from '@kne/responsive-utils';
import './assets/index.scss';
import './mobileText/style.scss';
import './mobileChoice/style.scss';
import './mobileLayout/style.scss';
import {globalParams} from './preset';
import {FormMobileContext, useFormMobile} from './mobileContext';

export * from '@kne/react-form';
export {hooks, widget, utils, hoc} from '@kne/react-form-helper';

const {ScrollToError, EnterSubmit, FormStore, MaxLabelProvider, SizeProvider} = widget;

const Form = forwardRef((originProps, ref) => {
    const {
        className, cache, enterSubmit = false, scrollToError = true, scrollProps = {
            block: 'center'
        }, type: originType, size: originSize, mobile: originMobile, children, ...props
    } = originProps;
    const isMobile = useIsMobile();
    const parentMobile = useFormMobile();
    const mobile = originMobile !== undefined ? originMobile : (parentMobile !== undefined ? parentMobile : globalParams.mobile);
    const baseClass = 'react-form';
    let computedClass = baseClass;
    const {type, size} = Object.assign({
        type: 'default', size: 'middle'
    }, globalParams, originProps);
    if (type !== 'default') {
        computedClass += `--${type}`;
    }

    if (size !== 'middle') {
        computedClass += `--${size}`;
    }

    const maxLabel = <MaxLabelProvider>
        {children}
    </MaxLabelProvider>;

    return (<form className={classnames(baseClass, computedClass, isMobile && 'is-mobile', mobile === false && 'is-mobile-disabled', className)} onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
    }}>
        <FormMobileContext.Provider value={mobile}>
            <SizeProvider value={{size}}>
                <ReactForm {...props} ref={ref}>
                    {cache ? <FormStore cache={cache}/> : null}
                    {scrollToError ? <ScrollToError scrollProps={scrollProps}/> : null}
                    {enterSubmit ? <EnterSubmit>
                        {maxLabel}
                    </EnterSubmit> : maxLabel}
                </ReactForm>
            </SizeProvider>
        </FormMobileContext.Provider>
    </form>);
});

/*Form.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['inline', 'default', 'inner']),
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    enterSubmit: PropTypes.bool,
    scrollToError: PropTypes.bool,
    scrollProps: PropTypes.shape({
        block: PropTypes.oneOf(['start', 'center', 'end', 'nearest']),
        behavior: PropTypes.oneOf(['auto', 'smooth']),
        inline: PropTypes.oneOf(['start', 'center', 'end', 'nearest'])
    })
};*/

export default Form;
