import {DatePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const _DatePicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(DatePicker);
};

_DatePicker.defaultProps = {
    fieldName: 'datePicker'
};

const _MonthPicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(MonthPicker);
};

_MonthPicker.defaultProps = {
    fieldName: 'monthDatePicker'
};

const _RangePicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(RangePicker);
};

_RangePicker.defaultProps = {
    fieldName: 'rangeDatePicker'
};

const _WeekPicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(WeekPicker);
};

_WeekPicker.defaultProps = {
    fieldName: 'weekDatePicker'
};

_DatePicker.MonthPicker = _MonthPicker;
_DatePicker.RangePicker = _RangePicker;
_DatePicker.WeekPicker = _WeekPicker;


export default _DatePicker;
