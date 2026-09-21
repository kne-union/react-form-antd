import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import withMobileText from '../mobileText/withMobileText';

const {useDecorator} = hooks;

const MobileInput = withMobileText(Input);
const MobilePassword = withMobileText(Input.Password);

const InputFieldInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'input', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: formatMessage({id: 'PleaseInput'}, {label: mergedProps.label})}, mergedProps));
    return render(MobileInput);
};

InputFieldInner.Field = Input;

const PasswordInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'password', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: formatMessage({id: 'PleaseInput'}, {label: mergedProps.label})}, mergedProps));
    return render(MobilePassword);
};

PasswordInner.Field = Input.Password;

const InputField = withLocale(InputFieldInner);
InputField.Password = withLocale(PasswordInner);

export default InputField;
