import React, {useState} from 'react';
import {Input, Select, DatePicker, RadioGroup, FormModal, Editor, Checkbox} from '@juliewang/react-form-antd';
// import {Input, Select, DatePicker, RadioGroup, FormModal} from './dist/index';
import {Button} from 'antd';
import '@juliewang/react-form-antd/dist/style.scss';
// import './dist/style.scss';
import 'antd/dist/antd.css';


export default () => {
  const [isShow, setIsShow] = useState(false);
  return <>
    <FormModal visible={isShow} onCancel={() => setIsShow(false)} title="表单" formProps={{
      debug: true,
      url: '/mock/data.json',
      rules: {
        EXIT: (value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({result: true});
            }, 3000);
          });
        }
      }, onSubmit: (data) => {
        console.log('--------data', data);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      }
    }}>
      <Input realtime debounce={1000} name="name" label="姓名" rule="REQ"/>
      {isShow ? <Input name="rname" label="姓名" rule="REQ TEL EXIT"/> : null}
      <Select name="select" label="选项" rule="REQ">
        <Select.Option value="1">选项一</Select.Option>
        <Select.Option value="2">选项二</Select.Option>
        <Select.Option value="3">选项三</Select.Option>
      </Select>
      <DatePicker name="date" label="日期" rule="REQ" format="YYYY-MM-DD"/>
      <RadioGroup name="radio" label="单选" rule="REQ">
        <RadioGroup.Radio value="1">选项一</RadioGroup.Radio>
        <RadioGroup.Radio value="2">选项二</RadioGroup.Radio>
        <RadioGroup.Radio value="3">选项三</RadioGroup.Radio>
      </RadioGroup>
      <Checkbox name="check" lable="选择">是否同意</Checkbox>
      <Editor name="template" label="邮件模板" rule="REQ"/>
    </FormModal>
    <Button onClick={() => {
      setIsShow(!isShow);
    }}>切换</Button>
    <div style={{width: '100%', height: 1000}}></div>
  </>
};
