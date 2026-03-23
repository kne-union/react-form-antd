const {default: Form, Input, InputNumber, SubmitButton, preset, RULES} = _ReactFormAntd;
const {Flex, Card, Divider, Alert, Space, Button, Typography} = antd;
const {Text} = Typography;
const {useState, useEffect} = React;

const ValidationExample = () => {
    const [formData, setFormData] = useState(null);
    const formRef = React.useRef();

    // 配置自定义校验规则
    useEffect(() => {
        preset({
            rules: Object.assign({}, RULES, {
                // 自定义密码强度规则（带参数）
                PASSWORD_STRENGTH: (value, level, {data}) => {
                    if (!value) return {result: true, errMsg: ''};
                    const strength = value.length >= 6 ? (value.length >= 10 ? 3 : 2) : 1;
                    const hasNumber = /\d/.test(value);
                    const hasLetter = /[a-zA-Z]/.test(value);
                    const hasSpecial = /[!@#$%^&*]/.test(value);
                    const score = (hasNumber ? 1 : 0) + (hasLetter ? 1 : 0) + (hasSpecial ? 1 : 0);
                    const finalStrength = strength + score;
                    return {
                        result: finalStrength >= (level || 2),
                        errMsg: finalStrength < (level || 2) ? `密码强度不足，当前强度: ${finalStrength}` : '',
                        data: {strength: finalStrength}
                    };
                }, // 确认密码规则（使用数据联动）
                CONFIRM_PASSWORD: (value, {data}) => {
                    return {
                        result: value === data.password, errMsg: '两次输入的密码不一致'
                    };
                }, // 异步验证规则：用户名唯一性检查
                CHECK_USERNAME: async (value, {field}) => {
                    if (!value) return {result: true, errMsg: ''};
                    // 模拟已存在的用户名
                    const existingUsernames = ['admin', 'test', 'user', 'root'];
                    console.log(`开始验证用户名: ${value}`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    console.log(`验证完成用户名: ${value}`);
                    const exists = existingUsernames.includes(value.toLowerCase());
                    return {
                        result: !exists, errMsg: exists ? '该用户名已被占用' : ''
                    };
                }
            })
        });
    }, []);

    return (<Flex vertical gap={24}>
        <Card title="内置校验规则" size="small">
            <Form onSubmit={setFormData}>
                <Flex vertical gap={16}>
                    <Alert
                        message="内置规则: REQ(必填), TEL(手机号), EMAIL(邮箱), LEN-最小-最大(长度限制)"
                        type="info"
                        showIcon
                    />
                    <Input name="required" label="必填字段" rule="REQ" placeholder="此项为必填"/>
                    <Input name="tel" label="手机号" rule="REQ TEL" placeholder="请输入手机号"/>
                    <Input name="email" label="邮箱" rule="REQ EMAIL" placeholder="请输入邮箱"/>
                    <Input name="length" label="长度限制" rule="REQ LEN-2-10" placeholder="长度需在2-10个字符之间"/>
                    <Input name="combined" label="组合规则" rule="REQ LEN-4-20 EMAIL"
                           placeholder="必填 + 长度4-20 + 邮箱格式"/>
                </Flex>
            </Form>
        </Card>

        <Card title="自定义校验规则" size="small">
            <Form onSubmit={setFormData}>
                <Flex vertical gap={16}>
                    <Alert
                        message="通过 preset 配置自定义规则，支持正则、函数、异步函数三种形式"
                        type="info"
                        showIcon
                    />
                    <Input
                        name="password"
                        label="密码"
                        rule="REQ LEN-6-20 PASSWORD_STRENGTH-3"
                        placeholder="请输入密码（需要高强度）"
                    />
                    <Input
                        name="confirmPassword"
                        label="确认密码"
                        rule="REQ CONFIRM_PASSWORD"
                        placeholder="请再次输入密码"
                    />
                </Flex>
            </Form>
        </Card>

        <Card title="异步校验规则" size="small">
            <Form onSubmit={setFormData}>
                <Flex vertical gap={16}>
                    <Alert
                        message="支持异步验证，如远程接口校验用户名唯一性"
                        type="info"
                        showIcon
                    />
                    <Text type="secondary">已占用的用户名: admin, test, user, root</Text>
                    <Input
                        name="username"
                        label="用户名"
                        rule="REQ LEN-3-20 CHECK_USERNAME"
                        placeholder="请输入用户名（会异步校验唯一性）"
                    />
                </Flex>
            </Form>
        </Card>

        <Card title="实时校验" size="small">
            <Form onSubmit={setFormData}>
                <Flex vertical gap={16}>
                    <Alert
                        message="realtime 属性会在输入时实时校验，不需要等待失焦"
                        type="info"
                        showIcon
                    />
                    <Input name="realtimeInput" label="实时校验" realtime rule="REQ LEN-2-10"
                           placeholder="输入时实时校验"/>
                    <Input name="normalInput" label="普通校验" rule="REQ LEN-2-10" placeholder="失焦时校验"/>
                </Flex>
            </Form>
        </Card>

        <Card title="表单操作 API" size="small">
            <Form ref={formRef} onSubmit={setFormData}>
                <Flex vertical gap={16}>
                    <Input name="field1" label="字段1" rule="REQ" placeholder="测试字段1"/>
                    <Input name="field2" label="字段2" rule="LEN-0-20" placeholder="测试字段2"/>
                </Flex>
            </Form>
            <Divider/>
            <Space wrap>
                <Button onClick={() => formRef.current?.setFormData({field1: '预设值', field2: '测试数据'})}>
                    设置表单值
                </Button>
                <Button onClick={() => console.log('表单数据:', formRef.current?.getFormData())}>
                    获取表单值
                </Button>
                <Button onClick={() => formRef.current?.reset()}>重置表单</Button>
                <Button onClick={() => formRef.current?.validateAll()}>手动校验</Button>
            </Space>
        </Card>

        {formData && (<Card title="提交数据" size="small">
                    <pre style={{
                        background: '#f5f5f5', padding: 12, borderRadius: 4
                    }}>{JSON.stringify(formData, null, 2)}</pre>
        </Card>)}
    </Flex>);
};

render(<ValidationExample/>);
