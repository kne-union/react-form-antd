import Input from 'antd/es/input';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const TextArea = (props) => {
    const render = useDecorator(props);
    return render(Input.TextArea);
};

export default TextArea;
