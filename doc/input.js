const {Input, InputNumber, TextArea} = _ReactFormAntd;
const {default: Form, SubmitButton} = _ReactFormAntd;
const {Flex, Card, Space, Divider} = antd;
const {useState} = React;

const InputExample = () => {
    const [formData, setFormData] = useState(null);

    return (
        <Flex vertical gap={24}>
            <Card title="Input 文本输入框" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Input name="basicInput" label="基础输入" placeholder="请输入文本" />
                        <Input name="requiredInput" label="必填输入" rule="REQ" placeholder="此项为必填" />
                        <Input name="lengthInput" label="长度限制" rule="LEN-2-10" placeholder="长度需在2-10个字符之间" />
                        <Input name="realtimeInput" label="实时校验" realtime rule="REQ" placeholder="输入时实时校验" />
                        <Input.Password name="password" label="密码输入" rule="REQ LEN-6-20" placeholder="请输入6-20位密码" />
                        <Input.Password
                            name="confirmPassword"
                            label="确认密码"
                            rule="REQ LEN-6-20"
                            placeholder="请再次输入密码"
                        />
                        <Divider>带前缀/后缀</Divider>
                        <Input name="price" label="价格" addonBefore="¥" placeholder="请输入金额" />
                        <Input name="website" label="网址" addonAfter=".com" placeholder="请输入网站名称" />
                    </Flex>
                </Form>
            </Card>

            <Card title="InputNumber 数字输入框" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <InputNumber name="basicNumber" label="基础数字" placeholder="请输入数字" />
                        <InputNumber name="ageNumber" label="年龄" min={0} max={150} placeholder="0-150" />
                        <InputNumber name="priceNumber" label="价格" min={0} step={0.01} precision={2} placeholder="请输入价格" />
                        <InputNumber name="quantityNumber" label="数量" min={1} max={999} step={10} placeholder="请输入数量" />
                        <InputNumber name="formatterNumber" label="格式化数字" formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/¥\s?|(,*)/g, '')} />
                    </Flex>
                </Form>
            </Card>

            <Card title="TextArea 多行文本" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <TextArea name="basicTextArea" label="基础文本域" placeholder="请输入内容" rows={4} />
                        <TextArea name="limitedTextArea" label="字数限制" rule="LEN-0-200" placeholder="最多200字" rows={4} showCount maxLength={200} />
                        <TextArea name="autoTextArea" label="自适应高度" placeholder="自动调整高度" autoSize={{minRows: 2, maxRows: 6}} />
                    </Flex>
                </Form>
            </Card>

            {formData && (
                <Card title="表单数据" size="small">
                    <pre style={{background: '#f5f5f5', padding: 12, borderRadius: 4}}>{JSON.stringify(formData, null, 2)}</pre>
                </Card>
            )}
        </Flex>
    );
};

render(<InputExample />);
