import Form, {Select, DatePicker} from '@kne/react-form-antd';
import {Button} from 'antd';
import {useRef} from 'react';

export default () => {
    const ref = useRef();
    return <Form>
        <Select.Fetch ref={ref} name='select-fetch' label="选择框" url="/select-fetch.json">{({data}) => {
            return {
                options: data.dataList
            };
        }}</Select.Fetch>
        <Button onClick={() => {
            console.log('刷新');
            ref.current.reload({test: 123});
        }}>刷新</Button>
        <DatePicker className="RangePicker" name="range" label="时间" showTime/>
    </Form>
};
