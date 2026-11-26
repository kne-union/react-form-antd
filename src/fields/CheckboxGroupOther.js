import React from 'react';
import {Checkbox, Input} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import classnames from 'classnames';

const {useOnChange} = hooks;

const CheckboxGroupOther = ({value, onChange, options, otherOption, otherProps, disabled, modern, block, indexType, className, ...props}) => {
    const {formatMessage} = useIntl();
    const other = Object.assign({label: formatMessage({id: 'Other'}), value: 'other'}, otherOption);
    const currentValue = value?.value || [];
    const isOther = currentValue.indexOf(other.value) > -1;
    return <>
        <Checkbox.Group {...props} className={classnames(className, {'react-form__choice-modern': modern, 'react-form__choice-modern--number': modern && indexType === 'number', 'react-form__choice-modern--check': modern && indexType === 'check', 'react-form__choice-block': block})}
                        disabled={disabled} options={[...(options || []), other]} value={currentValue}
                        onChange={(list) => {
                            onChange && onChange(list.indexOf(other.value) > -1 ? {
                                value: list,
                                other: value?.other
                            } : {value: list});
                        }}/>
        {isOther && <Input.TextArea placeholder={formatMessage({id: 'PleaseInputOther'})} {...otherProps}
                                    className="react-form__field-other" disabled={disabled} value={value?.other}
                                    onChange={(e) => {
                                        onChange && onChange({value: currentValue, other: e.target.value});
                                    }}/>}
    </>;
};

const _CheckboxGroupOther = (props) => {
    props = Object.assign({}, {
        fieldName: 'checkboxGroupOther'
    }, props);
    const render = useOnChange(props);
    return render(CheckboxGroupOther);
};

_CheckboxGroupOther.Field = withLocale(CheckboxGroupOther);

export default withLocale(_CheckboxGroupOther);
