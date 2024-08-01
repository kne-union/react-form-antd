import {InputNumber} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const InputNumberField = (props) => {
    props = Object.assign({}, {
        fieldName: 'inputNumber', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(InputNumber);
};

InputNumberField.Field = InputNumber;

export default InputNumberField;
