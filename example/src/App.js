import React from 'react';
import {ConfigProvider} from 'antd';
import Form, {Input, SubmitButton} from '@kne/react-form-antd';
import zhCN from 'antd/lib/locale/zh_CN';

const App = () => {
    return <ConfigProvider autoInsertSpaceInButton={false} locale={zhCN}>
        <Form cache="hahha" onSubmit={(data) => {
            console.log(data);
        }}>
            <Input name="name" label="名称" rule="REQ LEN-0-4"/>
            <div style={{
                height:'2000px'
            }}></div>
            <SubmitButton>提交</SubmitButton>
        </Form>
    </ConfigProvider>;
};

export default App;

