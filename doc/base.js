const {default: Form, Input, InputNumber, Select, TextArea, Switch, Checkbox, CheckboxGroup, RadioGroup, DatePicker, TimePicker, Rate, Slider, SubmitButton} = _ReactFormAntd;
const {Flex, Space, Divider} = antd;
const {useState} = React;

const BaseExample = () => {
    const [formData, setFormData] = useState(null);
    return (
        <Flex vertical gap={24}>
            <Form
                onSubmit={(data) => {
                    console.log('表单提交数据:', data);
                    setFormData(data);
                }}
            >
                <Flex vertical gap={16}>
                    <Input name="username" label="用户名" rule="REQ" placeholder="请输入用户名" />
                    <Input.Password name="password" label="密码" rule="REQ LEN-6-20" placeholder="请输入6-20位密码" />
                    <InputNumber name="age" label="年龄" rule="REQ NUM" min={0} max={150} placeholder="请输入年龄" />
                    <Select
                        name="gender"
                        label="性别"
                        rule="REQ"
                        placeholder="请选择性别"
                        options={[
                            {label: '男', value: 'male'},
                            {label: '女', value: 'female'}
                        ]}
                    />
                    <TextArea name="description" label="个人简介" placeholder="请输入个人简介" rows={3} />
                    <RadioGroup name="status" label="状态" rule="REQ" options={[{label: '启用', value: 1}, {label: '禁用', value: 0}]} />
                    <CheckboxGroup
                        name="hobbies"
                        label="兴趣爱好"
                        options={[
                            {label: '阅读', value: 'reading'},
                            {label: '运动', value: 'sports'},
                            {label: '音乐', value: 'music'},
                            {label: '旅行', value: 'travel'}
                        ]}
                    />
                    <Switch name="subscribe" label="订阅通知" />
                    <Rate name="rating" label="评分" allowHalf />
                    <Slider name="progress" label="进度" />
                    <DatePicker name="birthday" label="出生日期" rule="REQ" />
                    <TimePicker name="appointmentTime" label="预约时间" />
                    <SubmitButton>提交表单</SubmitButton>
                </Flex>
            </Form>
            {formData && (
                <>
                    <Divider>提交数据</Divider>
                    <pre style={{background: '#f5f5f5', padding: 12, borderRadius: 4}}>{JSON.stringify(formData, null, 2)}</pre>
                </>
            )}
        </Flex>
    );
};

render(<BaseExample />);
