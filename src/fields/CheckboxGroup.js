import Checkbox from 'antd/es/checkbox';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const _CheckboxGroup = Checkbox.Group;

const CheckboxGroup = (props) => {
    const render = useOnChange(props);
    return render(_CheckboxGroup);
};

CheckboxGroup.Checkbox = Checkbox;

export default CheckboxGroup;
