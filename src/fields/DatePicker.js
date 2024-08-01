import {DatePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const _DatePicker = (props) => {
    props = Object.assign({}, {
        fieldName: 'datePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(DatePicker);
};

_DatePicker.Field = DatePicker;

const _MonthPicker = (props) => {
    props = Object.assign({}, {
        fieldName: 'monthDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(MonthPicker);
};

_MonthPicker.Field = MonthPicker;

const _RangePicker = (props) => {
    props = Object.assign({}, {
        fieldName: 'rangeDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(RangePicker);
};

_RangePicker.Field = RangePicker;

const _WeekPicker = (props) => {
    props = Object.assign({}, {
        fieldName: 'weekDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(WeekPicker);
};

_WeekPicker.Field = WeekPicker;

_DatePicker.MonthPicker = _MonthPicker;
_DatePicker.RangePicker = _RangePicker;
_DatePicker.WeekPicker = _WeekPicker;


export default _DatePicker;
