import {Switch as _Switch} from 'antd';
import {hooks, hoc} from '@kne/react-form-helper';

const {useOnChange, useCheckedToValue} = hooks;
const {withChecked} = hoc;
const WithSwitch = withChecked(_Switch);

const Switch = (props) => {
    props = Object.assign({}, {
        fieldName: 'switch'
    }, props);
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(WithSwitch);
};

Switch.Field = _Switch;

export default Switch;
