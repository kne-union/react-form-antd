import {Select} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withFetch from '../common/withFetch';

const {useOnChange} = hooks;

const _Select = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(Select);
};

_Select.Fetch = withFetch(Select);

_Select.Option = Select.Option;
_Select.OptGroup = Select.OptGroup;

_Select.defaultProps = _Select.Fetch.defaultProps = {
    fieldName: 'select'
};

export default _Select;
