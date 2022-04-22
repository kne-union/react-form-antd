import {DatePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';
import getPopupContainer from "../common/getPopupContainer";

const {useOnChange} = hooks;

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const _DatePicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(DatePicker);
};

_DatePicker.defaultProps = {
    getPopupContainer
};

const _MonthPicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(MonthPicker);
};

const _RangePicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    // if(props.selectToday){
    //     return render(RangePickerToday);
    // }
    return render(RangePicker);
};

_RangePicker.defaultProps = {
    getPopupContainer
};

const _WeekPicker = (props) => {
    const render = useOnChange(Object.assign({placeholder: ['开始时间', '结束时间']}, props));
    return render(WeekPicker);
};

_WeekPicker.defaultProps = {
    getPopupContainer
};

_DatePicker.MonthPicker = _MonthPicker;
_DatePicker.RangePicker = _RangePicker;
_DatePicker.WeekPicker = _WeekPicker;


export default _DatePicker;
