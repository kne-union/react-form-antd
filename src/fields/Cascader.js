import {Cascader as _Cascader} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const Cascader = (props) => {
    const render = useOnChange(props);
    return render(_Cascader);
};

Cascader.defaultProps = {
    fieldName: 'cascader'
};

export default Cascader;

