import React from 'react';
import {ConfigProvider} from 'antd';
import Form, {Input, SubmitButton, Avatar, DatePickerToday} from '@kne/react-form-antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// const { TodayPicker } = DatePicker;


const App = () => {


    const onChange=(v)=>{
        console.log(v);
    }
    // const onCalendarChange=(v)=>{
    //     console.log('onCalendarChange',v);
    //     if(!v[1])d.current=v[0];
    //     console.log(v[0].format('YYYY/MM/DD'));
    //     console.log(v[1].format('YYYY/MM/DD'));
    // }

    return <ConfigProvider autoInsertSpaceInButton={false} locale={zhCN}>
        <Form cache="hahha"  data={{
            name:'xx',
            // time:['2020-09-12','至今']
        }} onSubmit={(data) => {
            console.log('提交',data);
        }}>
            <Input name="name" label="名称" rule="REQ LEN-0-4"/>
            <Avatar
                label="租户图标："
                name="miniIcon"
                editor={{ open: true, width: 200, height: 200 }}
                size={500}
                imageType={['image/jpeg', 'image/png', 'image/gif']}
            />
            <Avatar name="icon" editor={{ open: true, height: 200, width:400 }} size={500}  imageType={['image/jpeg', 'image/png', 'image/gif']} />
            {/*<div style={{*/}
            {/*    height:'2000px'*/}
            {/*}}></div>*/}
            {/*<RangePicker  name="time"/>*/}
            {/*<RangePicker renderExtraFooter={foot}/>*/}
            {/*<RangePicker*/}
            {/*    ranges={{*/}
            {/*        '至今': [moment(), moment()],*/}
            {/*        'this month': [moment().startOf('month'), moment().endOf('month')],*/}
            {/*    }}*/}
            {/*    onCalendarChange={onCalendarChange}*/}
            {/*    format="YYYY/MM/DD HH:mm:ss"*/}
            {/*    onChange={onChange}*/}
            {/*    name="time"*/}
            {/*/>*/}
            {/*<RangePicker/>*/}
            <DatePickerToday label="时间" rule="REQ" name="time" selectToday={true} onChange={onChange} />
            <SubmitButton>提交</SubmitButton>
        </Form>
    </ConfigProvider>;
};

export default App;

