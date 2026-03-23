const {Rate, Slider, Switch} = _ReactFormAntd;
const {default: Form, SubmitButton} = _ReactFormAntd;
const {Flex, Card, Divider} = antd;
const {useState} = React;

const RateSliderExample = () => {
    const [formData, setFormData] = useState(null);

    return (
        <Flex vertical gap={24}>
            <Card title="Rate 评分" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Rate name="basicRate" label="基础评分" />
                        <Rate name="requiredRate" label="必选评分" rule="REQ" />
                        <Rate name="halfRate" label="半星评分" allowHalf />
                        <Rate name="customRate" label="自定义数量" count={10} />
                        <Rate name="disabledRate" label="禁用状态" disabled defaultValue={3} />
                        <Rate name="clearRate" label="可清除" allowClear />
                        <Rate name="charRate" label="自定义字符" character="A" allowHalf />
                        <Rate name="heartRate" label="心形评分" character="♥" allowHalf style={{color: 'red'}} />
                    </Flex>
                </Form>
            </Card>

            <Card title="Slider 滑动条" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Slider name="basicSlider" label="基础滑动条" />
                        <Slider name="rangeSlider" label="范围滑动条" range defaultValue={[20, 50]} />
                        <Slider name="stepSlider" label="步长设置" step={10} defaultValue={30} />
                        <Slider name="marksSlider" label="带标记" marks={{0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C'}} defaultValue={37} />
                        <Slider name="minMaxSlider" label="范围限制" min={0} max={1000} defaultValue={100} />
                        <Slider name="disabledSlider" label="禁用状态" disabled defaultValue={30} />
                        <Slider name="verticalSlider" label="垂直方向" vertical style={{height: 200}} />
                    </Flex>
                </Form>
            </Card>

            <Card title="Switch 开关" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Switch name="basicSwitch" label="基础开关" />
                        <Switch name="requiredSwitch" label="必选开关" rule="REQ" />
                        <Switch name="textSwitch" label="带文字" checkedChildren="开" unCheckedChildren="关" />
                        <Switch name="disabledSwitch" label="禁用状态" disabled defaultChecked />
                        <Switch name="smallSwitch" label="小尺寸" size="small" />
                        <Switch name="loadingSwitch" label="加载中" loading />
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

render(<RateSliderExample />);
