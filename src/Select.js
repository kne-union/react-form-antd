import {useOnChange} from './useDecorator';
import Select from 'antd/es/select';

const _Select = (props) => {
    const render = useOnChange(props);
    return render(Select);
};

_Select.Option = Select.Option;

export default _Select;
