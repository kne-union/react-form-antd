import {Cascader as _Cascader} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withMobilePopup from '../mobilePopup/withMobilePopup';

const {useOnChange} = hooks;

const MobileCascader = withMobilePopup(_Cascader, {kind: 'select'});

const Cascader = (props) => {
    props = Object.assign({}, {
        fieldName: 'cascader'
    }, props);
    const render = useOnChange(props);
    return render(MobileCascader);
};

Cascader.Field = MobileCascader;

export default Cascader;

