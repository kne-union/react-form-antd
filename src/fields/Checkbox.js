import {Checkbox as _Checkbox} from 'antd';
import {hooks, hoc} from '@kne/react-form-helper';

const {useOnChange, useCheckedToValue} = hooks;
const {withChecked} = hoc;

const WithCheckbox = withChecked(_Checkbox);

const Checkbox = (props) => {
    const checkedProps = useCheckedToValue(Object.assign({}, props, {
        onChange: (e) => {
            props.onChange && props.onChange(e.target.checked);
        }
    }));
    const render = useOnChange(checkedProps);
    return render(WithCheckbox);
};

Checkbox.defaultProps = {
    fieldName: 'checkbox'
};

export default Checkbox;
