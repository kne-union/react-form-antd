import React from 'react';
import {Checkbox} from 'antd';
import {hooks} from '@kne/react-form-helper';
import classnames from 'classnames';

const {useOnChange} = hooks;

const _CheckboxGroup = ({modern, block, indexType, className, ...props}) => {
    return <Checkbox.Group {...props}
                           className={classnames(className, {'react-form__choice-modern': modern, 'react-form__choice-modern--number': modern && indexType === 'number', 'react-form__choice-modern--check': modern && indexType === 'check', 'react-form__choice-block': block})}/>;
};

const CheckboxGroup = (props) => {
    props = Object.assign({}, {
        fieldName: 'checkboxGroup'
    }, props);
    const render = useOnChange(props);
    return render(_CheckboxGroup);
};

CheckboxGroup.Checkbox = Checkbox;
CheckboxGroup.Field = _CheckboxGroup;

export default CheckboxGroup;
