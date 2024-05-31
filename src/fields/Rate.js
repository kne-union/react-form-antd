import {Rate as _Rate} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const Rate = (props) => {
    const render = useOnChange(Object.assign({}, props));
    return render(_Rate);
};

Rate.defaultProps = {
    fieldName: 'rate'
};

export default Rate;
