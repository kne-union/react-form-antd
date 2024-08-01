import {TimePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const {RangePicker} = TimePicker;

const _TimePicker = (props) => {
    props = Object.assign({}, {
        fieldName: 'timePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(TimePicker);
};

_TimePicker.Field = TimePicker;

const _RangePicker = (props) => {
    props = Object.assign({}, {
        fieldName: 'rangeTimePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(RangePicker);
};

_RangePicker.Field = RangePicker;

_TimePicker.RangePicker = _RangePicker;

export default _TimePicker;
