import {TimePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import withDayjsValue from '../utils/withDayjsValue';

const {useOnChange} = hooks;

const {RangePicker} = TimePicker;

const DayjsTimePicker = withDayjsValue(TimePicker);
const DayjsRangePicker = withDayjsValue(RangePicker);

const TimePickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'timePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(DayjsTimePicker);
};

TimePickerInner.Field = DayjsTimePicker;

const RangePickerInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'rangeTimePicker'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(DayjsRangePicker);
};

RangePickerInner.Field = DayjsRangePicker;

const _TimePicker = withLocale(TimePickerInner);
_TimePicker.RangePicker = withLocale(RangePickerInner);

export default _TimePicker;
