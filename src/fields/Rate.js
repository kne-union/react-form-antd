import {Rate as _Rate} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const Rate = (props) => {
    props = Object.assign({}, {
        fieldName: 'rate'
    }, props);
    const render = useOnChange(Object.assign({}, props));
    return render(_Rate);
};

Rate.Field = _Rate;

export default Rate;
