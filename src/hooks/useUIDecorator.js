import React, {useRef, useState, useContext, useCallback, useEffect} from 'react';
import {useApi} from '@kne/react-form';
import content from '../context';
import classnames from 'classnames';
import getMaxWidth from '../util/getMaxWidth';
import get from 'lodash/get';
import getValues from 'lodash/values';

export default ({name, className, onChange, label, labelHidden, errorMsg, errorState, fieldRef, wrappedClassName, important, ignoreLabelWidth, ...others}) => {
    const {fieldList, emitter} = useApi();
    const [isREQ, setIsREQ] = useState(false),
        {maxLabelWidth, setMaxLabelWidth} = useContext(content),
        labelRef = useRef(null),
        [isSubmit, setIsSubmit] = useState(false),
        [changed, setChanged] = useState(false);

    //给必填字段前加标识 计算表单最大label宽度
    useEffect(() => {
        if (labelRef.current) {
            setIsREQ(
                get(fieldList.current[name], 'field.current.rule', '')
                    .split(' ')
                    .indexOf('REQ') > -1
            );
            if (!ignoreLabelWidth) {
                const fontSize = window
                    .getComputedStyle(labelRef.current)
                    .getPropertyValue('font-size');
                setMaxLabelWidth(
                    getMaxWidth(
                        getValues(fieldList.current)
                            .filter(item => !item.field.current.ignoreLabelWidth)
                            .map(item => {
                                return item.field.current.label;
                            }),
                        fontSize
                    )
                );
            }
        }
    }, [fieldList, setIsREQ, setMaxLabelWidth, ignoreLabelWidth, name]);

    //当表单提交时设置状态
    useEffect(() => {
        const subscription = emitter.addListener('check', (isPass, {isForce, fields}) => {
            if (fields.indexOf(name) > -1 && isForce === true) {
                setIsSubmit(true);
            }
        });
        return () => {
            subscription.remove();
        };
    }, [emitter, name]);

    const handlerChange = useCallback((...args) => {
        onChange(...args);
        setChanged(true);
        setIsSubmit(false);
    }, [onChange, setChanged, setIsSubmit]);

    return useCallback((WrappedComponent) => {
        const style = {};

        if (maxLabelWidth) {
            style.minWidth = maxLabelWidth;
        }

        return (
            <div
                ref={fieldRef}
                className={classnames(
                    'react-form__field',
                    {
                        'is-req-error':
                            errorMsg === '' && errorState === 2 && (isSubmit || changed),
                        'is-error': errorMsg !== '' && errorState === 2,
                        'is-loading': errorState === 3
                    },
                    wrappedClassName
                )}>
                <div className="react-form__field-main">
                    {label && !labelHidden ? (
                        <div
                            className={classnames('react-form__field-label', {
                                'is-req': important !== undefined ? important : isREQ
                            })}
                            ref={labelRef}
                            style={style}>
                            <i className="react-form__field_extra"/>
                            {label}
                        </div>
                    ) : null}
                    <div className="react-form__field-input">
                        <WrappedComponent {...others}
                                          className={classnames('react-form__field-component', className)}
                                          onChange={handlerChange}/>
                        {errorMsg ? (
                            <div className="react-form__field-error">{errorMsg}</div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }, [maxLabelWidth, others, changed, className, errorMsg, errorState, fieldRef, handlerChange, important, isREQ, isSubmit, label, wrappedClassName]);
};
