import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const TextArea = (props) => {
    props = Object.assign({}, {
        fieldName: 'textArea'
    }, props);
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Input.TextArea);
};

TextArea.Field = Input.TextArea;

export default TextArea;
