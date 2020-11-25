import Select from 'antd/es/select';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const _Select = (props) => {
    const render = useOnChange(props);
    return render(Select);
};

_Select.Option = Select.Option;
_Select.OptGroup = Select.OptGroup;

export default _Select;
