const {default: Form, Input, SubmitButton, ResetButton, CancelButton} = _ReactFormAntd;
const {Flex, Card, Space, Divider, message, Button, Alert} = antd;
const {useState} = React;

const ButtonsExample = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (data) => {
        console.log('提交数据:', data);
        setFormData(data);
        setLoading(true);
        // 模拟异步提交
        setTimeout(() => {
            setLoading(false);
            message.success('提交成功！');
        }, 1500);
    };

    return (
        <Flex vertical gap={24}>
            <Card title="SubmitButton 提交按钮" size="small">
                <Form onSubmit={handleSubmit}>
                    <Flex vertical gap={16}>
                        <Input name="username" label="用户名" rule="REQ" placeholder="请输入用户名" />
                        <Input.Password name="password" label="密码" rule="REQ" placeholder="请输入密码" />
                        <Divider>提交按钮类型</Divider>
                        <Space wrap>
                            <SubmitButton>默认提交</SubmitButton>
                            <SubmitButton type="default">Default类型</SubmitButton>
                            <SubmitButton type="dashed">Dashed类型</SubmitButton>
                            <SubmitButton type="primary" loading={loading}>带加载状态</SubmitButton>
                        </Space>
                        <Divider>实时校验模式</Divider>
                        <Alert message="realtime属性为true时，表单未通过校验时按钮禁用" type="info" showIcon style={{marginBottom: 16}} />
                        <SubmitButton realtime>实时校验提交</SubmitButton>
                    </Flex>
                </Form>
            </Card>

            <Card title="ResetButton 重置按钮" size="small">
                <Form>
                    <Flex vertical gap={16}>
                        <Input name="field1" label="字段1" placeholder="输入后点击重置" />
                        <Input name="field2" label="字段2" placeholder="输入后点击重置" />
                        <Space>
                            <ResetButton>重置表单</ResetButton>
                            <ResetButton type="primary">Primary重置</ResetButton>
                            <ResetButton danger>Danger重置</ResetButton>
                        </Space>
                    </Flex>
                </Form>
            </Card>

            <Card title="CancelButton 取消按钮" size="small">
                <Form cache="form-cache-key">
                    <Flex vertical gap={16}>
                        <Alert message="CancelButton用于清除表单缓存，配合Form的cache属性使用" type="info" showIcon />
                        <Input name="cachedField1" label="缓存字段1" placeholder="输入后会缓存" />
                        <Input name="cachedField2" label="缓存字段2" placeholder="输入后会缓存" />
                        <Space>
                            <CancelButton onClick={() => message.info('取消并清除缓存')}>取消</CancelButton>
                            <CancelButton type="default">Default取消</CancelButton>
                        </Space>
                    </Flex>
                </Form>
            </Card>

            <Card title="完整表单示例" size="small">
                <Form
                    cache="complete-form"
                    onSubmit={handleSubmit}
                >
                    <Flex vertical gap={16}>
                        <Input name="name" label="姓名" rule="REQ" placeholder="请输入姓名" />
                        <Input name="email" label="邮箱" rule="REQ" placeholder="请输入邮箱" />
                        <Input name="phone" label="电话" placeholder="请输入电话" />
                        <Divider>表单操作</Divider>
                        <Space>
                            <SubmitButton type="primary">提交</SubmitButton>
                            <ResetButton>重置</ResetButton>
                            <CancelButton>取消</CancelButton>
                        </Space>
                    </Flex>
                </Form>
            </Card>

            {formData && (
                <Card title="提交数据" size="small">
                    <pre style={{background: '#f5f5f5', padding: 12, borderRadius: 4}}>{JSON.stringify(formData, null, 2)}</pre>
                </Card>
            )}
        </Flex>
    );
};

render(<ButtonsExample />);
