import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withLocale, {useIntl} from '../withLocale';

const {useDecorator} = hooks;

const InputFieldInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'input', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: formatMessage({id: 'PleaseInput'}, {label: mergedProps.label})}, mergedProps));
    return render(Input);
};

InputFieldInner.Field = Input;

const PasswordInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'password', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: formatMessage({id: 'PleaseInput'}, {label: mergedProps.label})}, mergedProps));
    return render(Input.Password);
};

PasswordInner.Field = Input.Password;

const InputField = withLocale(InputFieldInner);
InputField.Password = withLocale(PasswordInner);

export default InputField;
