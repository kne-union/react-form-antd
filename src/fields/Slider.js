import {Slider as _Slider} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const Slider = (props) => {
    props = Object.assign({}, {
        fieldName: 'slider'
    }, props);
    const render = useOnChange(Object.assign({}, props));
    return render(_Slider);
};

Slider.Field = _Slider;

export default Slider;
