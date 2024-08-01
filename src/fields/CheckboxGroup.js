import {Checkbox} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const _CheckboxGroup = Checkbox.Group;

const CheckboxGroup = (props) => {
    props = Object.assign({}, {
        fieldName: 'checkboxGroup'
    }, props);
    const render = useOnChange(props);
    return render(_CheckboxGroup);
};

CheckboxGroup.Checkbox = Checkbox;
CheckboxGroup.Field = _CheckboxGroup;

export default CheckboxGroup;
