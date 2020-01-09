import useDecorator from './useDecorator';
import InputNumber from 'antd/es/input-number';

export default (props) => {
    const render = useDecorator(props);
    return render(InputNumber);
};
