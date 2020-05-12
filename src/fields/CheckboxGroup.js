import {useOnChange} from '../hooks/useDecorator';
import Checkbox from 'antd/es/checkbox';

const CheckboxGroup = Checkbox.Group;

const _CheckboxGroup = (props) => {
    const render = useOnChange(props);
    return render(CheckboxGroup);
};

_CheckboxGroup.Checkbox = Checkbox;

export default _CheckboxGroup;
