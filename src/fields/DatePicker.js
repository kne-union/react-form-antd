import {DatePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';
import RangePickerToday from './DatePickerToday'

const {useOnChange} = hooks;

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const _DatePicker = (props) => {
    const render = useOnChange(props);
    return render(DatePicker);
};

const _MonthPicker = (props) => {
    const render = useOnChange(props);
    return render(MonthPicker);
};

const _RangePicker = (props) => {
    const render = useOnChange(props);
    // if(props.selectToday){
    //     return render(RangePickerToday);
    // }
    return render(RangePicker);
};

const _WeekPicker = (props) => {
    const render = useOnChange(props);
    return render(WeekPicker);
};

const _TodayPicker = (props) => {
    // console.log('>>>',props);
    const render = useOnChange(props);
    return render(RangePickerToday);
};

_DatePicker.MonthPicker = _MonthPicker;
_DatePicker.RangePicker = _RangePicker;
_DatePicker.WeekPicker = _WeekPicker;
_DatePicker.TodayPicker = _TodayPicker;


export default _DatePicker;
