const {DatePicker, TimePicker, DatePickerToday} = _ReactFormAntd;
const {default: Form, SubmitButton} = _ReactFormAntd;
const {Flex, Card, Divider} = antd;
const {useState} = React;

const DatePickerExample = () => {
    const [formData, setFormData] = useState(null);

    return (
        <Flex vertical gap={24}>
            <Card title="DatePicker 日期选择" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <DatePicker name="basicDate" label="基础日期" placeholder="请选择日期" />
                        <DatePicker name="requiredDate" label="必选日期" rule="REQ" placeholder="此项为必选" />
                        <DatePicker name="formatDate" label="自定义格式" format="YYYY年MM月DD日" placeholder="请选择日期" />
                        <DatePicker name="disabledDate" label="禁用日期" placeholder="请选择日期" disabledDate={(current) => current && current < Date.now()} />
                        <Divider>日期范围选择</Divider>
                        <DatePicker.RangePicker name="dateRange" label="日期范围" placeholder={['开始日期', '结束日期']} />
                        <DatePicker.RangePicker name="requiredDateRange" label="必选范围" rule="REQ" placeholder={['开始日期', '结束日期']} />
                        <Divider>其他类型</Divider>
                        <DatePicker.MonthPicker name="monthPicker" label="月份选择" placeholder="请选择月份" />
                        <DatePicker.WeekPicker name="weekPicker" label="周选择" placeholder="请选择周" />
                    </Flex>
                </Form>
            </Card>

            <Card title="TimePicker 时间选择" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <TimePicker name="basicTime" label="基础时间" placeholder="请选择时间" />
                        <TimePicker name="requiredTime" label="必选时间" rule="REQ" placeholder="此项为必选" />
                        <TimePicker name="formatTime" label="自定义格式" format="HH时mm分ss秒" placeholder="请选择时间" />
                        <TimePicker name="stepTime" label="步长设置" hourStep={1} minuteStep={15} secondStep={30} placeholder="请选择时间" />
                        <TimePicker.RangePicker name="timeRange" label="时间范围" placeholder={['开始时间', '结束时间']} />
                    </Flex>
                </Form>
            </Card>

            <Card title="DatePickerToday 快捷日期" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <DatePickerToday name="basicToday" label="基础日期范围" />
                        <DatePickerToday name="requiredToday" label="必选范围" rule="REQ" />
                        <DatePickerToday name="weekPicker" label="周选择" picker="week" />
                        <DatePickerToday name="monthPicker" label="月份选择" picker="month" />
                        <DatePickerToday name="yearPicker" label="年份选择" picker="year" />
                        <DatePickerToday
                            name="customSoFarText"
                            label="自定义至今文本"
                            soFarText="现在"
                        />
                        <DatePickerToday
                            name="customSoFarValue"
                            label="自定义至今值"
                            soFarText="至今"
                            soFarValue="PRESENT"
                            onChange={([start, end]) => {
                                if (end === 'PRESENT') {
                                    console.log('用户选择了至今');
                                }
                            }}
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

render(<DatePickerExample />);
