import React from 'react';
import {Radio, Input} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import classnames from 'classnames';

const {useOnChange} = hooks;

const RadioGroupOther = ({value, onChange, options, otherOption, otherProps, disabled, modern, block, indexType, className, ...props}) => {
    const {formatMessage} = useIntl();
    const other = Object.assign({label: formatMessage({id: 'Other'}), value: 'other'}, otherOption);
    const currentValue = value?.value;
    const isOther = currentValue !== undefined && currentValue === other.value;
    return <>
        <Radio.Group {...props}
                     className={classnames(className, props.optionType !== 'button' && {'react-form__choice-modern': modern, 'react-form__choice-modern--number': modern && indexType === 'number', 'react-form__choice-modern--check': modern && indexType === 'check', 'react-form__choice-block': block})}
                     disabled={disabled} options={[...(options || []), other]} value={currentValue}
                     onChange={(e) => {
                         const nextValue = e.target.value;
                         onChange && onChange(nextValue === other.value ? {
                             value: nextValue,
                             other: value?.other
                         } : {value: nextValue});
                     }}/>
        {isOther && <Input.TextArea placeholder={formatMessage({id: 'PleaseInputOther'})} {...otherProps}
                                    className="react-form__field-other" disabled={disabled} value={value?.other}
                                    onChange={(e) => {
                                        onChange && onChange({value: other.value, other: e.target.value});
                                    }}/>}
    </>;
};

const _RadioGroupOther = (props) => {
    props = Object.assign({}, {
        fieldName: 'radioGroupOther'
    }, props);
    const render = useOnChange(props);
    return render(RadioGroupOther);
};

_RadioGroupOther.Field = withLocale(RadioGroupOther);

export default withLocale(_RadioGroupOther);
