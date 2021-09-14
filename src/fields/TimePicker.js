import {TimePicker} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const {RangePicker} = TimePicker;

const _TimePicker = (props) => {
    const render = useOnChange(props);
    return render(TimePicker);
};

const _RangePicker = (props) => {
    const render = useOnChange(props);
    return render(RangePicker);
};

_TimePicker.RangePicker = _RangePicker;

export default _TimePicker;
