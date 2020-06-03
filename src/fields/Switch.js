import {useOnChange} from '../hooks/useDecorator';
import Switch from 'antd/es/switch';
import useCheckedToValue, {withChecked} from '../hooks/useCheckedToValue';

const _Switch = withChecked(Switch);

export default (props) => {
  const checkedProps = useCheckedToValue(props);
  const render = useOnChange(checkedProps);
  return render(_Switch);
};
