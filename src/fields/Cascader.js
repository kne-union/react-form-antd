import {useOnChange} from '../hooks/useDecorator';
import Cascader from 'antd/es/calendar';

export default (props) => {
    const render = useOnChange(props);
    return render(Cascader);
};

