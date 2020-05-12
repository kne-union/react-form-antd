import useDecorator from '../hooks/useDecorator';
import Input from 'antd/es/input';

const InputField = (props) => {
  const render = useDecorator(props);
  return render(Input);
};

InputField.defaultProps = {
  autoComplete: 'off'
};

export default InputField;
