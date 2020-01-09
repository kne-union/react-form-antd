import {useOnChange} from './useDecorator';
import Radio from 'antd/es/radio';

const RadioGroup = Radio.Group;

const _RadioGroup = (props) => {
    const render = useOnChange(props);
    return render(RadioGroup);
};

_RadioGroup.Radio = Radio;

export default _RadioGroup;
