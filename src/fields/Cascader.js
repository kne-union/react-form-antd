import {Cascader as _Cascader} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const Cascader = (props) => {
    props = Object.assign({}, {
        fieldName: 'cascader'
    }, props);
    const render = useOnChange(props);
    return render(_Cascader);
};

Cascader.Field = _Cascader;

export default Cascader;

