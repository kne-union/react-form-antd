import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const InputField = (props) => {
  const render = useDecorator(props);
  return render(Input);
};

InputField.defaultProps = {
  autoComplete: 'off'
};

export default InputField;
