import {TimePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const {RangePicker} = TimePicker;

const _TimePicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(TimePicker);
};

_TimePicker.defaultProps = {
    fieldName: 'timePicker'
};

const _RangePicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(RangePicker);
};

_RangePicker.defaultProps = {
    fieldName: 'rangeTimePicker'
};

_TimePicker.RangePicker = _RangePicker;

export default _TimePicker;
