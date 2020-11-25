import _Cascader from 'antd/es/calendar';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const Cascader = (props) => {
    const render = useOnChange(props);
    return render(_Cascader);
};

export default Cascader;

