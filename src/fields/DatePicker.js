import {DatePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import withDayjsValue from '../utils/withDayjsValue';

const {useOnChange} = hooks;

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const DayjsDatePicker = withDayjsValue(DatePicker, {stripTime: true, defaultPicker: 'date'});
const DayjsMonthPicker = MonthPicker
  ? withDayjsValue(MonthPicker, {stripTime: true, defaultPicker: 'month'})
  : DayjsDatePicker;
const DayjsRangePicker = withDayjsValue(RangePicker, {stripTime: true, defaultPicker: 'date'});
const DayjsWeekPicker = WeekPicker
  ? withDayjsValue(WeekPicker, {stripTime: true, defaultPicker: 'week'})
  : DayjsDatePicker;

const DatePickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'datePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(DayjsDatePicker);
};

DatePickerInner.Field = DayjsDatePicker;

const MonthPickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'monthDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: [formatMessage({id: 'StartTime'}), formatMessage({id: 'EndTime'})]}, mergedProps));
    return render(DayjsMonthPicker);
};

MonthPickerInner.Field = DayjsMonthPicker;

const RangePickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'rangeDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: [formatMessage({id: 'StartTime'}), formatMessage({id: 'EndTime'})]}, mergedProps));
    return render(DayjsRangePicker);
};

RangePickerInner.Field = DayjsRangePicker;

const WeekPickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'weekDatePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: [formatMessage({id: 'StartTime'}), formatMessage({id: 'EndTime'})]}, mergedProps));
    return render(DayjsWeekPicker);
};

WeekPickerInner.Field = DayjsWeekPicker;

const _DatePicker = withLocale(DatePickerInner);
_DatePicker.MonthPicker = withLocale(MonthPickerInner);
_DatePicker.RangePicker = withLocale(RangePickerInner);
_DatePicker.WeekPicker = withLocale(WeekPickerInner);

export default _DatePicker;
