import React, {useRef, useEffect} from 'react';
import {ConfigProvider, Button, Divider} from 'antd';
import Form, {
    Select,
    Input,
    SubmitButton,
    Avatar,
    DatePickerToday,
    Upload,
    GroupList,
    Group,
    useFormContext
} from '@kne/react-form-antd';
import SelectFetchDemo from './SelectFetchDemo';
import zhCN from 'antd/lib/locale/zh_CN';
// const { TodayPicker } = DatePicker;

const EventTest = () => {
    const {emitter} = useFormContext();
    useEffect(() => {
        emitter.addListener('form-submit-success', (data) => {
            console.log('>>>>>>>>---------form-submit-success', data);
        });
    }, [emitter]);
    return null;
};


const App = () => {


    const onChange = (v) => {
        console.log(v);
    }
    // const onCalendarChange=(v)=>{
    //     console.log('onCalendarChange',v);
    //     if(!v[1])d.current=v[0];
    //     console.log(v[0].format('YYYY/MM/DD'));
    //     console.log(v[1].format('YYYY/MM/DD'));
    // }
    const addButton = useRef();
    return <ConfigProvider autoInsertSpaceInButton={false} locale={zhCN}>
        {/*<FormModal visible title="哈哈哈">
            <Select name="select" label="哈哈哈" options={[
                {label:'sss',value:1}
            ]}/>
        </FormModal>*/}
        <SelectFetchDemo/>
        <Divider/>
        <Form data={{
            name: 'xx',
            // time:['2020-09-12','至今']
        }} onSubmit={(data) => {
            console.log('提交', data);
        }}>
            <EventTest/>
            <Select.Fetch name="remote-select" label="远程选择" url="/select-fetch.json">{({data}) => {
                console.log(data.dataList);
                return {options: data.dataList};
            }}</Select.Fetch>
            <Select name="select" label="哈哈哈" options={[
                {label: 'sss', value: 1}
            ]}/>
            <Input name="name" label="名称" rule="REQ LEN-0-4"/>
            <Input.Password name="password" label="密码"/>
            <br/>
            <Group name="target">
                <Input name="name" label="名称"/>
                <Input name="des" label="描述"/>
            </Group>
            <Group name="target">
                <Input name="name" label="名称"/>
                <Input name="des" label="描述"/>
            </Group>
            <br/>
            <div>
                <Button onClick={() => {
                    addButton.current.onAdd();
                }}>添加</Button>
            </div>
            <GroupList name="list" ref={addButton}>
                {(key, {onRemove}) => {
                    return <>
                        <Button onClick={onRemove}>删除</Button>
                        <Input name="name" label="名称"/>
                        <Input name="des" label="描述"/>
                    </>;
                }}
            </GroupList>
            <Avatar
                label="租户图标"
                name="miniIcon"
                editorTips="我是一段tips"
                editor={{open: true, width: 200, height: 200}}
                size={500}
                imageType={['image/jpeg', 'image/png', 'image/gif']}
            />
            <Upload label="文件" name="file"
                    value={['http://app.knxgalaxy.com/api/io/file/data/clickpaas/files/G3823/30614080ab084c6eb7262fbfd8676090.jpg?attname=90b8748f5f56784caa6dfc66fa5fcf18.jpg']}/>
            <DatePickerToday label="时间" name="time" selectToday={true} onChange={onChange}/>
            <Upload name="file2" label="文件" maxLength={3} multiple fileSize={20}
                    onChange={(list) => {
                        console.log('onChange', list);
                    }}/>
            <SubmitButton>提交</SubmitButton>
        </Form>
    </ConfigProvider>;
};

export default App;

