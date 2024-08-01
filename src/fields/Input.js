import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const InputField = (props) => {
    props = Object.assign({}, {
        fieldName: 'input', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Input);
};

InputField.Field = Input;

InputField.Password = (props) => {
    props = Object.assign({}, {
        fieldName: 'password', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Input.Password);
};

InputField.Password.Field = Input.Password;

export default InputField;
