import {Select} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const _Select = (props) => {
    props = Object.assign({}, {
        fieldName: 'select'
    }, props);
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(Select);
};
_Select.Field = Select;
_Select.Option = Select.Option;
_Select.OptGroup = Select.OptGroup;

export default _Select;
