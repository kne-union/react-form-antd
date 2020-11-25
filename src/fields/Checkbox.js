import _Checkbox from 'antd/es/checkbox';
import {hooks, hoc} from '@kne/react-form-helper';

const {useOnChange, useCheckedToValue} = hooks;
const {withChecked} = hoc;

const WithCheckbox = withChecked(_Checkbox);

const Checkbox = (props) => {
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(WithCheckbox);
};

export default Checkbox;
