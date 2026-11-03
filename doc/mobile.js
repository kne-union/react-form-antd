const {default: Form, Input, Select, DatePicker, InputNumber, SubmitButton, useFormIsMobile} = _ReactFormAntd;
const {Flex, Card, Tag} = antd;

const LayoutState = () => {
    const isMobile = useFormIsMobile();
    return <Tag color={isMobile ? 'blue' : 'default'}>{isMobile ? '移动端布局' : 'PC 布局'}</Tag>;
};

const MobileExample = () => {
    return (<Flex vertical gap={24}>
        <Card title="移动端自动适配（默认）" size="small">
            <Form type="default" onSubmit={data => console.log('提交报销单', data)}>
                <LayoutState/>
                <Input name="title" label="报销事由" rule="REQ" placeholder="如：上海客户拜访差旅"/>
                <Select name="category" label="费用类型" rule="REQ" options={[
                    {label: '交通费', value: 'traffic'},
                    {label: '住宿费', value: 'hotel'},
                    {label: '餐饮费', value: 'meal'}
                ]}/>
                <InputNumber name="amount" label="金额（元）" rule="REQ" min={0} precision={2}/>
                <DatePicker name="date" label="发生日期" rule="REQ"/>
                <SubmitButton>提交报销</SubmitButton>
            </Form>
        </Card>

        <Card title="登录场景：mobile={false} 关闭移动端布局" size="small">
            <Form type="inner" mobile={false} onSubmit={data => console.log('登录', data)}>
                <LayoutState/>
                <Input name="account" label="账号" rule="REQ" placeholder="手机号 / 邮箱"/>
                <Input.Password name="password" label="密码" rule="REQ" placeholder="请输入密码"/>
                <Select name="tenant" label="登录租户" options={[
                    {label: '总部', value: 'hq'},
                    {label: '华东分公司', value: 'east'}
                ]}/>
                <SubmitButton block>登录</SubmitButton>
            </Form>
        </Card>
    </Flex>);
};

render(<MobileExample/>);
