import React from 'react';
import {ConfigProvider} from 'antd';
import Form, {Input, SubmitButton, Avatar, DatePickerToday, TreeSelect,Select} from '@kne/react-form-antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { TreeNode } = TreeSelect;
// const { TodayPicker } = DatePicker;
const OPTIONS = [{ label:'Apples', value:'x' },{ label:'Apples1', value:'x1' },{ label:'Apples2', value:'x3' }];



const App = () => {


    const onChange=(v)=>{
        console.log('wwww',v);
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

            <TreeSelect
                label="时间" rule="REQ" name="sle"
                showSearch
                multiple
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
            >
                <div>
                    <TreeNode value="parent 1" title="parent 1">
                        <TreeNode value="parent 1-0" title="parent 1-0">
                            <TreeNode value="leaf1" title="leaf1" />
                            <TreeNode value="leaf2" title="leaf2" />
                        </TreeNode>
                        <TreeNode value="parent 1-1" title="parent 1-1">
                            <TreeNode value="leaf3" disabled title={<b style={{ color: '#08c' }}>leaf3</b>} />
                        </TreeNode>
                    </TreeNode>
                </div>

            </TreeSelect>

            <Select label="选择" rule="REQ" name="nanana" mode="multiple" options={OPTIONS}
            onChange={onChange} max={2}/>
            <SubmitButton>提交</SubmitButton>
        </Form>
    </ConfigProvider>;
};

export default App;

