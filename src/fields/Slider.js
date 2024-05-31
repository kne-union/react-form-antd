import {Slider as _Slider} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const Slider = (props) => {
    const render = useOnChange(Object.assign({}, props));
    return render(_Slider);
};

Slider.defaultProps = {
    fieldName: 'slider'
};

export default Slider;
