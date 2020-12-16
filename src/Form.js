import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactForm from '@kne/react-form';
import {widget} from '@kne/react-form-helper';
import './assets/index.scss';

export * from '@kne/react-form';
export {hooks, utils} from '@kne/react-form-helper';

const {ScrollToError, EnterSubmit, FormStore, MaxLabelProvider, SizeProvider} = widget;

const Form = forwardRef(({className, cache, enterSubmit, scrollToError, type, size, children, ...props}, ref) => {
    let computedClass = 'react-form';
    if (type !== 'default') {
        computedClass += `--${type}`;
    }

    if (size !== 'middle') {
        computedClass += `--${size}`;
    }

    const maxLabel = <MaxLabelProvider>
        {children}
    </MaxLabelProvider>;

    return (
        <form className={classnames(computedClass, className)} onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}>
            <SizeProvider value={{size}}>
                <ReactForm {...props} ref={ref}>
                    {cache ? <FormStore cache={cache}/> : null}
                    {scrollToError ? <ScrollToError/> : null}
                    {enterSubmit ? <EnterSubmit>
                        {maxLabel}
                    </EnterSubmit> : maxLabel}
                </ReactForm>
            </SizeProvider>
        </form>
    );
});

Form.defaultProps = {
    type: 'default',
    size: 'middle',
    scrollToError: true,
    enterSubmit: false
};

Form.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['inline', 'default', 'inner']),
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    enterSubmit: PropTypes.bool,
    scrollToError: PropTypes.bool
};

export default Form;