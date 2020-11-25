import _Switch from 'antd/es/switch';
import {hooks, hoc} from '@kne/react-form-helper';

const {useOnChange, useCheckedToValue} = hooks;
const {withChecked} = hoc;
const WithSwitch = withChecked(_Switch);

const Switch = (props) => {
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(WithSwitch);
};

export default Switch;
