import {useOnChange} from '../hooks/useDecorator';
import Checkbox from 'antd/es/checkbox';
import useCheckedToValue, {withChecked} from '../hooks/useCheckedToValue';

const _Checkbox = withChecked(Checkbox);

export default (props) => {
  const checkedProps = useCheckedToValue(props);
  const render = useOnChange(checkedProps);
  return render(_Checkbox);
};
