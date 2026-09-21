import {TimePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import withDayjsValue from '../utils/withDayjsValue';
import withMobilePopup from '../mobilePopup/withMobilePopup';

const {useOnChange} = hooks;

const {RangePicker} = TimePicker;

const DayjsTimePicker = withMobilePopup(withDayjsValue(TimePicker), {kind: 'picker'});
const DayjsRangePicker = withMobilePopup(withDayjsValue(RangePicker), {kind: 'range-picker'});

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
