import {DatePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withLocale, {useIntl} from '../withLocale';

const {useOnChange} = hooks;

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const DatePickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'datePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(DatePicker);
};

DatePickerInner.Field = DatePicker;

const MonthPickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'monthDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: [formatMessage({id: 'StartTime'}), formatMessage({id: 'EndTime'})]}, mergedProps));
    return render(MonthPicker);
};

MonthPickerInner.Field = MonthPicker;

const RangePickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'rangeDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: [formatMessage({id: 'StartTime'}), formatMessage({id: 'EndTime'})]}, mergedProps));
    return render(RangePicker);
};

RangePickerInner.Field = RangePicker;

const WeekPickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'weekDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: [formatMessage({id: 'StartTime'}), formatMessage({id: 'EndTime'})]}, mergedProps));
    return render(WeekPicker);
};

WeekPickerInner.Field = WeekPicker;

const _DatePicker = withLocale(DatePickerInner);
_DatePicker.MonthPicker = withLocale(MonthPickerInner);
_DatePicker.RangePicker = withLocale(RangePickerInner);
_DatePicker.WeekPicker = withLocale(WeekPickerInner);

export default _DatePicker;
