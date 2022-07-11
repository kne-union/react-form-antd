import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const InputField = (props) => {
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Input);
};

InputField.Password = (props) => {
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Input.Password);
};

InputField.defaultProps = {
    fieldName: 'input',
    autoComplete: 'off'
};

InputField.Password.defaultProps = {
    fieldName: 'password',
    autoComplete: 'off'
};

export default InputField;
