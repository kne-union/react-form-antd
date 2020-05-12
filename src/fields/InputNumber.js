import useDecorator from '../hooks/useDecorator';
import InputNumber from 'antd/es/input-number';

const InputNumberField = (props) => {
  const render = useDecorator(props);
  return render(InputNumber);
};

InputNumberField.defaultProps = {
  autoComplete: 'off'
};

export default InputNumberField;
