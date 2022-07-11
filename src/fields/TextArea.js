import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const TextArea = (props) => {
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Input.TextArea);
};

TextArea.defaultProps = {
    fieldName: 'textArea'
};

export default TextArea;
