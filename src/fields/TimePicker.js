import {TimePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withLocale, {useIntl} from '../withLocale';

const {useOnChange} = hooks;

const {RangePicker} = TimePicker;

const TimePickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'timePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(TimePicker);
};

TimePickerInner.Field = TimePicker;

const RangePickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'rangeTimePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(RangePicker);
};

RangePickerInner.Field = RangePicker;

const _TimePicker = withLocale(TimePickerInner);
_TimePicker.RangePicker = withLocale(RangePickerInner);

export default _TimePicker;
