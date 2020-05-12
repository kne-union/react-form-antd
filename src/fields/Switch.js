import {useOnChange} from '../hooks/useDecorator';
import Switch from 'antd/es/switch';
import useCheckedToValue from '../hooks/useCheckedToValue';

export default (props) => {
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(Switch);
};
