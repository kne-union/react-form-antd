import useDecorator from './useDecorator';
import Input from 'antd/es/input';

export default (props) => {
    const render = useDecorator(props);
    return render(Input);
};
