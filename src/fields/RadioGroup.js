import React, {useCallback} from 'react';
import {Radio} from 'antd';
import {hooks} from '@kne/react-form-helper';
import classnames from 'classnames';

const {useOnChange} = hooks;

const RadioGroup = ({onChange, modern, block, indexType, className, ...props}) => {
    props = Object.assign({}, {
        fieldName: 'radioGroup'
    }, props);
    const handler = useCallback((e) => {
        onChange && onChange(e.target.value);
    }, [onChange]);
    return <Radio.Group {...props}
                        className={classnames(className, props.optionType !== 'button' && {'react-form__choice-modern': modern, 'react-form__choice-modern--number': modern && indexType === 'number', 'react-form__choice-modern--check': modern && indexType === 'check', 'react-form__choice-block': block})}
                        onChange={handler}/>
};

const _RadioGroup = (props) => {
    const render = useOnChange(props);
    return render(RadioGroup);
};

_RadioGroup.Field = RadioGroup;
_RadioGroup.Radio = Radio;

export default _RadioGroup;
