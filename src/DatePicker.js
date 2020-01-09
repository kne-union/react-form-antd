import {useOnChange} from './useDecorator';
import DatePicker from 'antd/es/date-picker';

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
    return render(RangePicker);
};

const _WeekPicker = (props) => {
    const render = useOnChange(props);
    return render(WeekPicker);
};

_DatePicker.MonthPicker = _MonthPicker;
_DatePicker.RangePicker = _RangePicker;
_DatePicker.RangePicker = _WeekPicker;

export default _DatePicker;
