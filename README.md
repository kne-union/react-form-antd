# react-form
用于表单验证的react组件

### demo
``

            <Avatar editor={{open: true, width: 250, height: 250, borderRadius: 1}}
                    beforeUpload={(file) => {}}/>

            <Input realtime debounce={1000} name="name" label="姓名" rule="REQ TEL EXIT"/>
            {isShow ? <Input name="rname" label="姓名哈哈哈" rule="REQ TEL EXIT"/> : null}
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
      
``

# Change Log

20200430 v0.1.13 添加了SelectFetch和SelectSearch控件
20200430 v0.1.14 修改Select组件样式的默认宽度为100%
20200508 v0.1.16 删除field last-child 样式 margin-bottom 为0
20200509 v0.1.17 修改导出文件结构，增加fields导出所有field组件
20200522 v0.1.20 添加头像上传组件
20200525 v0.1.22 更新@kne/react-fetch以支持setData方法
20200529 v0.1.23 添加头像上传组件field Avatar
20200603 v0.1.24 修正Switch的值转换bug
