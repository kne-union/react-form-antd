const {Checkbox, CheckboxGroup, RadioGroup} = _ReactFormAntd;
const {default: Form, SubmitButton} = _ReactFormAntd;
const {Flex, Card, Divider, Space} = antd;
const {useState} = React;

const CheckboxRadioExample = () => {
    const [formData, setFormData] = useState(null);

    return (
        <Flex vertical gap={24}>
            <Card title="Checkbox 复选框" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Checkbox name="agree" label="同意协议">我已阅读并同意《用户协议》</Checkbox>
                        <Checkbox name="subscribe" label="订阅">订阅新闻资讯</Checkbox>
                        <Checkbox name="requiredCheckbox" rule="REQ">此项为必选</Checkbox>
                        <Checkbox name="disabledCheckbox" disabled>禁用状态</Checkbox>
                    </Flex>
                </Form>
            </Card>

            <Card title="CheckboxGroup 复选框组" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <CheckboxGroup
                            name="fruits"
                            label="喜欢的水果"
                            options={[
                                {label: '苹果', value: 'apple'},
                                {label: '香蕉', value: 'banana'},
                                {label: '橙子', value: 'orange'},
                                {label: '葡萄', value: 'grape'}
                            ]}
                        />
                        <CheckboxGroup
                            name="requiredFruits"
                            label="必选水果"
                            rule="REQ"
                            options={[
                                {label: '苹果', value: 'apple'},
                                {label: '香蕉', value: 'banana'}
                            ]}
                        />
                        <CheckboxGroup
                            name="interests"
                            label="兴趣爱好"
                            options={[
                                {label: '阅读', value: 'reading'},
                                {label: '运动', value: 'sports'},
                                {label: '音乐', value: 'music'},
                                {label: '旅行', value: 'travel'},
                                {label: '摄影', value: 'photography'},
                                {label: '游戏', value: 'gaming'}
                            ]}
                        />
                    </Flex>
                </Form>
            </Card>

            <Card title="RadioGroup 单选框组" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <RadioGroup
                            name="gender"
                            label="性别"
                            options={[
                                {label: '男', value: 'male'},
                                {label: '女', value: 'female'}
                            ]}
                        />
                        <RadioGroup
                            name="requiredGender"
                            label="必选性别"
                            rule="REQ"
                            options={[
                                {label: '男', value: 'male'},
                                {label: '女', value: 'female'}
                            ]}
                        />
                        <RadioGroup
                            name="size"
                            label="尺寸"
                            optionType="button"
                            buttonStyle="solid"
                            options={[
                                {label: '小', value: 'small'},
                                {label: '中', value: 'middle'},
                                {label: '大', value: 'large'}
                            ]}
                        />
                        <RadioGroup
                            name="status"
                            label="状态"
                            optionType="button"
                            options={[
                                {label: '启用', value: 1},
                                {label: '禁用', value: 0}
                            ]}
                        />
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

render(<CheckboxRadioExample />);
