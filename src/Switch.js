import {useOnChange} from './useDecorator';
import Switch from 'antd/es/switch';
import useCheckedToValue from './useCheckedToValue';

export default (props) => {
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(Switch);
};
