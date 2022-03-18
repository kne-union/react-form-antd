import {DatePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const _DatePicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props));
    return render(DatePicker);
};

const _MonthPicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props));
    return render(MonthPicker);
};

const _RangePicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props));
    // if(props.selectToday){
    //     return render(RangePickerToday);
    // }
    return render(RangePicker);
};

const _WeekPicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props));
    return render(WeekPicker);
};

_DatePicker.MonthPicker = _MonthPicker;
_DatePicker.RangePicker = _RangePicker;
_DatePicker.WeekPicker = _WeekPicker;


export default _DatePicker;
