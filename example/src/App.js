import React, {useState} from 'react';
import Form, {Input, Select, SubmitButton, DatePicker, RadioGroup} from '@kne/react-form-antd';
import {Button} from 'antd';
import '@kne/react-form-antd/dist/style.scss';
import 'antd/dist/antd.css';

export default () => {
    const [isShow, setIsShow] = useState(false);
    return <>
        <Form cache="test-form" rules={{
            EXIT: (value) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({result: true});
                    }, 3000);
                });
            }
        }} onSubmit={(data) => {
            console.log(data);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        }}>
            <Input realtime name="name" label="姓名" value="linzp" rule="REQ TEL EXIT"/>
            {isShow ? <Input realtime name="rname" label="姓名哈哈哈" value="linzp" rule="REQ TEL EXIT"/> : null}
            <Select name="select" label="选项" rule="REQ">
                <Select.Option value="1">选项一</Select.Option>
                <Select.Option value="2">选项二</Select.Option>
                <Select.Option value="3">选项三</Select.Option>
            </Select>
            <DatePicker name="date" label="日期" rule="REQ" format="" YYYY-MM-DD/>
            <RadioGroup name="radio" label="单选" rule="REQ">
                <RadioGroup.Radio value="1">选项一</RadioGroup.Radio>
                <RadioGroup.Radio value="2">选项二</RadioGroup.Radio>
                <RadioGroup.Radio value="3">选项三</RadioGroup.Radio>
            </RadioGroup>
            <SubmitButton>提交</SubmitButton>
        </Form>
        <Button onClick={()=>{
            setIsShow(!isShow);
        }}>切换</Button>
        <div style={{width: '100%', height: 1000}}></div>
    </>
};
