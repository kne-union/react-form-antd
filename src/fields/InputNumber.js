import {InputNumber} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withLocale, {useIntl} from '../withLocale';

const {useDecorator} = hooks;

const InputNumberFieldInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'inputNumber', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: formatMessage({id: 'PleaseInput'}, {label: mergedProps.label})}, mergedProps));
    return render(InputNumber);
};

InputNumberFieldInner.Field = InputNumber;

const InputNumberField = withLocale(InputNumberFieldInner);

export default InputNumberField;
