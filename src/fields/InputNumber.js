import InputNumber from 'antd/es/input-number';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const InputNumberField = (props) => {
  const render = useDecorator(props);
  return render(InputNumber);
};

InputNumberField.defaultProps = {
  autoComplete: 'off'
};

export default InputNumberField;
