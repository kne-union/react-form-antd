# react-form-antd

### 描述

把 @kne/react-form 表单校验逻辑应用到antd

### 安装

```shell
npm i --save @kne/react-form-antd
```

### 概述

基于 @kne/react-form 封装的 Ant Design 表单组件库，提供完整的表单校验功能和丰富的表单字段组件。

#### 核心特性

- **UI分离设计** - UI与校验逻辑分离，可适配不同UI框架
- **分级校验规则** - 支持同步/异步校验，可配置校验规则优先级
- **事件驱动架构** - 通过事件机制实现灵活扩展，支持调试模式
- **复杂表单支持** - 支持 GroupList 动态表单、嵌套表单、子表单
- **完整字段组件** - 覆盖所有常用 Ant Design 表单组件
- **国际化支持** - 内置中英文提示信息

#### 支持的组件

**表单核心**
- Form - 表单容器组件

**基础字段**
- Input / Input.Password - 文本输入框
- InputNumber - 数字输入框
- TextArea - 多行文本

**选择器**
- Select - 下拉选择器
- TreeSelect - 树形选择器
- Cascader - 级联选择器

**日期时间**
- DatePicker - 日期选择器
- TimePicker - 时间选择器
- DatePickerToday - 快捷日期选择

**多选/单选**
- Checkbox - 复选框
- CheckboxGroup - 复选框组
- RadioGroup - 单选框组

**其他**
- Rate - 评分
- Slider - 滑动条
- Switch - 开关

**按钮**
- SubmitButton - 提交按钮
- ResetButton - 重置按钮
- CancelButton - 取消按钮

**高级功能**
- GroupList - 动态表单列表
- preset - 全局配置

#### 快速开始

```bash
npm install @kne/react-form-antd antd
```

```jsx
import Form, { Input, SubmitButton } from '@kne/react-form-antd';

function MyForm() {
    return (
        <Form onSubmit={(data) => console.log(data)}>
            <Input name="username" label="用户名" rule="REQ" />
            <SubmitButton>提交</SubmitButton>
        </Form>
    );
}
```

#### 校验规则

```jsx
<Input name="field" rule="REQ" />           // 必填
<Input name="field" rule="LEN-2-10" />      // 长度2-10
<Input name="field" rule="REQ LEN-2-10" />  // 组合规则
```


### 示例

#### 示例代码

- 基础表单
- 展示表单的基本使用方法，包含各种表单字段和校验规则
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
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

```

- 表单类型和尺寸
- 展示表单的不同类型（default/inline/inner）和尺寸（small/middle/large）
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
const {default: Form, Input, SubmitButton} = _ReactFormAntd;
const {Flex, Card, Space} = antd;

const FormTypeExample = () => {
    return (<Flex vertical gap={24}>
        <Card title="Default 类型（默认）" size="small">
            <Form type="default">
                <Flex gap={16} vertical>
                    <Input name="name" label="姓名" rule="REQ"/>
                    <Input name="email" label="邮箱" rule="REQ"/>
                </Flex>
                <SubmitButton>提交</SubmitButton>
            </Form>
        </Card>

        <Card title="Inline 类型（行内表单）" size="small">
            <Form type="inline">
                <Space wrap>
                    <Input name="keyword" label="关键词"/>
                    <Input name="author" label="作者"/>
                </Space>
                <SubmitButton style={{marginLeft: 8}}>搜索</SubmitButton>
            </Form>
        </Card>

        <Card title="Inner 类型（内嵌表单）" size="small">
            <Form type="inner">
                <Flex gap={16} vertical>
                    <Input name="title" label="标题" rule="REQ"/>
                    <Input name="content" label="内容"/>
                    <SubmitButton>提交</SubmitButton>
                </Flex>
            </Form>
        </Card>

        <Card title="不同尺寸" size="small">
            <Flex vertical gap={16}>
                <Form size="small">
                    <Input name="smallField" label="Small 尺寸"/>
                </Form>
                <Form size="middle">
                    <Input name="middleField" label="Middle 尺寸（默认）"/>
                </Form>
                <Form size="large">
                    <Input name="largeField" label="Large 尺寸"/>
                </Form>
            </Flex>
        </Card>
    </Flex>);
};

render(<FormTypeExample/>);

```

- 输入框组件
- 展示Input和InputNumber组件的各种用法
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
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
                        <InputNumber name="formatterNumber" label="格式化数字" formatter={(value) => &#96;¥ ${value}&#96;.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/¥\s?|(,*)/g, '')} />
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

```

- 选择器组件
- 展示Select、TreeSelect、Cascader组件的使用方法
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
const {Select, TreeSelect, Cascader} = _ReactFormAntd;
const {default: Form, SubmitButton} = _ReactFormAntd;
const {Flex, Card, Divider} = antd;
const {useState} = React;

const SelectExample = () => {
    const [formData, setFormData] = useState(null);

    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            children: [
                {title: 'Child Node1', value: '0-0-1'},
                {title: 'Child Node2', value: '0-0-2'}
            ]
        },
        {
            title: 'Node2',
            value: '0-1',
            children: [
                {title: 'Child Node3', value: '0-1-1'},
                {title: 'Child Node4', value: '0-1-2'}
            ]
        }
    ];

    const cascaderOptions = [
        {
            label: '浙江省',
            value: 'zhejiang',
            children: [
                {
                    label: '杭州市',
                    value: 'hangzhou',
                    children: [
                        {label: '西湖区', value: 'xihu'},
                        {label: '余杭区', value: 'yuhang'}
                    ]
                },
                {
                    label: '宁波市',
                    value: 'ningbo',
                    children: [
                        {label: '海曙区', value: 'haishu'},
                        {label: '江北区', value: 'jiangbei'}
                    ]
                }
            ]
        },
        {
            label: '江苏省',
            value: 'jiangsu',
            children: [
                {
                    label: '南京市',
                    value: 'nanjing',
                    children: [
                        {label: '玄武区', value: 'xuanwu'},
                        {label: '鼓楼区', value: 'gulou'}
                    ]
                }
            ]
        }
    ];

    return (
        <Flex vertical gap={24}>
            <Card title="Select 选择器" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Select
                            name="basicSelect"
                            label="单选"
                            placeholder="请选择"
                            options={[
                                {label: '选项一', value: 1},
                                {label: '选项二', value: 2},
                                {label: '选项三', value: 3}
                            ]}
                        />
                        <Select
                            name="requiredSelect"
                            label="必选"
                            rule="REQ"
                            placeholder="此项为必选"
                            options={[
                                {label: '选项A', value: 'a'},
                                {label: '选项B', value: 'b'},
                                {label: '选项C', value: 'c'}
                            ]}
                        />
                        <Select
                            name="multiSelect"
                            label="多选"
                            mode="multiple"
                            placeholder="请选择多个选项"
                            options={[
                                {label: '苹果', value: 'apple'},
                                {label: '香蕉', value: 'banana'},
                                {label: '橙子', value: 'orange'},
                                {label: '葡萄', value: 'grape'}
                            ]}
                        />
                        <Select
                            name="searchSelect"
                            label="可搜索"
                            showSearch
                            placeholder="输入关键词搜索"
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={[
                                {label: '北京市', value: 'beijing'},
                                {label: '上海市', value: 'shanghai'},
                                {label: '广州市', value: 'guangzhou'},
                                {label: '深圳市', value: 'shenzhen'}
                            ]}
                        />
                        <Select
                            name="groupSelect"
                            label="分组选择"
                            placeholder="请选择"
                        >
                            <Select.OptGroup label="热门城市">
                                <Select.Option value="hot1">北京</Select.Option>
                                <Select.Option value="hot2">上海</Select.Option>
                            </Select.OptGroup>
                            <Select.OptGroup label="其他城市">
                                <Select.Option value="other1">杭州</Select.Option>
                                <Select.Option value="other2">成都</Select.Option>
                            </Select.OptGroup>
                        </Select>
                    </Flex>
                </Form>
            </Card>

            <Card title="TreeSelect 树选择" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <TreeSelect
                            name="basicTreeSelect"
                            label="单选树"
                            placeholder="请选择"
                            treeData={treeData}
                        />
                        <TreeSelect
                            name="requiredTreeSelect"
                            label="必选树"
                            rule="REQ"
                            placeholder="此项为必选"
                            treeData={treeData}
                        />
                        <TreeSelect
                            name="multiTreeSelect"
                            label="多选树"
                            treeCheckable
                            placeholder="请选择多个"
                            treeData={treeData}
                        />
                        <TreeSelect
                            name="searchTreeSelect"
                            label="可搜索树"
                            showSearch
                            placeholder="输入关键词搜索"
                            treeData={treeData}
                            filterTreeNode={(node, value) => node.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        />
                    </Flex>
                </Form>
            </Card>

            <Card title="Cascader 级联选择" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Cascader
                            name="basicCascader"
                            label="地区选择"
                            placeholder="请选择地区"
                            options={cascaderOptions}
                        />
                        <Cascader
                            name="requiredCascader"
                            label="必选地区"
                            rule="REQ"
                            placeholder="此项为必选"
                            options={cascaderOptions}
                        />
                        <Cascader
                            name="searchCascader"
                            label="可搜索"
                            showSearch
                            placeholder="支持搜索"
                            options={cascaderOptions}
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

render(<SelectExample />);

```

- 日期时间组件
- 展示DatePicker、TimePicker、DatePickerToday组件的使用方法
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
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

```

- 多选和单选组件
- 展示Checkbox、CheckboxGroup、RadioGroup组件的使用方法
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
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

```

- 评分和滑块组件
- 展示Rate、Slider、Switch组件的使用方法
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
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

```

- 表单校验
- 展示表单的各种校验规则和自定义校验
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
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
                        errMsg: finalStrength < (level || 2) ? &#96;密码强度不足，当前强度: ${finalStrength}&#96; : '',
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
                    console.log(&#96;开始验证用户名: ${value}&#96;);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    console.log(&#96;验证完成用户名: ${value}&#96;);
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

```

- 动态表单
- 展示GroupList动态表单的使用方法
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
const {default: Form, Input, Select, GroupList, SubmitButton} = _ReactFormAntd;
const {Flex, Card, Space, Button, Divider} = antd;
const {useState, useRef} = React;

const GroupListExample = () => {
    const [formData, setFormData] = useState(null);
    const addButtonRef = useRef();

    return (
        <Flex vertical gap={24}>
            <Card title="基础动态表单" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <GroupList name="members">
                            {({index, onRemove}) => (
                                <Space key={index} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                    <span>成员 {index + 1}:</span>
                                    <Input name="name" placeholder="姓名" rule="REQ" />
                                    <Input name="email" placeholder="邮箱" rule="REQ" />
                                    <Button danger onClick={onRemove}>删除</Button>
                                </Space>
                            )}
                        </GroupList>
                        <SubmitButton>提交</SubmitButton>
                    </Flex>
                </Form>
            </Card>

            <Card title="复杂动态表单" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Space>
                            <Button type="primary" onClick={() => addButtonRef.current?.onAdd()}>
                                添加联系人
                            </Button>
                        </Space>
                        <GroupList name="contacts" ref={addButtonRef} defaultLength={1}>
                            {({index, onRemove, onAdd}) => (
                                <Card key={index} title={&#96;联系人 ${index + 1}&#96;} size="small" extra={<Button danger size="small" onClick={onRemove}>删除</Button>}>
                                    <Flex vertical gap={12}>
                                        <Input name="name" label="姓名" rule="REQ" placeholder="请输入姓名" />
                                        <Input name="phone" label="电话" rule="REQ" placeholder="请输入电话" />
                                        <Input name="email" label="邮箱" placeholder="请输入邮箱" />
                                        <Select
                                            name="type"
                                            label="类型"
                                            rule="REQ"
                                            placeholder="请选择类型"
                                            options={[
                                                {label: '主要联系人', value: 'primary'},
                                                {label: '次要联系人', value: 'secondary'},
                                                {label: '紧急联系人', value: 'emergency'}
                                            ]}
                                        />
                                        <Input name="address" label="地址" placeholder="请输入地址" />
                                    </Flex>
                                </Card>
                            )}
                        </GroupList>
                        <SubmitButton>提交</SubmitButton>
                    </Flex>
                </Form>
            </Card>

            <Card title="嵌套表单" size="small">
                <Form onSubmit={setFormData}>
                    <Flex vertical gap={16}>
                        <Input name="projectName" label="项目名称" rule="REQ" placeholder="请输入项目名称" />
                        <Divider>项目成员</Divider>
                        <GroupList name="team">
                            {({index, onRemove}) => (
                                <Card key={index} size="small" title={&#96;成员 ${index + 1}&#96;} extra={<Button danger size="small" onClick={onRemove}>删除</Button>}>
                                    <Flex vertical gap={12}>
                                        <Input name="memberName" label="成员姓名" rule="REQ" />
                                        <Select
                                            name="role"
                                            label="角色"
                                            rule="REQ"
                                            options={[
                                                {label: '负责人', value: 'leader'},
                                                {label: '开发', value: 'developer'},
                                                {label: '测试', value: 'tester'}
                                            ]}
                                        />
                                        <GroupList name="tasks">
                                            {({index: taskIndex, onRemove: taskRemove}) => (
                                                <Space key={taskIndex} style={{display: 'flex', alignItems: 'center'}}>
                                                    <span>任务 {taskIndex + 1}:</span>
                                                    <Input name="taskName" placeholder="任务名称" rule="REQ" />
                                                    <Button danger size="small" onClick={taskRemove}>删除</Button>
                                                </Space>
                                            )}
                                        </GroupList>
                                    </Flex>
                                </Card>
                            )}
                        </GroupList>
                        <SubmitButton>提交</SubmitButton>
                    </Flex>
                </Form>
            </Card>

            {formData && (
                <Card title="表单数据" size="small">
                    <pre style={{background: '#f5f5f5', padding: 12, borderRadius: 4, maxHeight: 300, overflow: 'auto'}}>{JSON.stringify(formData, null, 2)}</pre>
                </Card>
            )}
        </Flex>
    );
};

render(<GroupListExample />);

```

- 表单按钮
- 展示SubmitButton、ResetButton、CancelButton的使用方法
- _ReactFormAntd(@kne/current-lib_react-form-antd),(@kne/current-lib_react-form-antd/dist/index.css),antd(antd)

```jsx
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

```

### API

#### 属性

| 属性            | 类型                                 | 默认值                 | 描述                             |
|---------------|------------------------------------|---------------------|--------------------------------|
| type          | `'default' \| 'inline' \| 'inner'` | `'default'`         | 表单类型                           |
| size          | `'small' \| 'middle' \| 'large'`   | `'middle'`          | 表单尺寸                           |
| className     | `string`                           | -                   | 自定义类名                          |
| cache         | `string`                           | -                   | 表单缓存标识，用于表单数据缓存                |
| enterSubmit   | `boolean`                          | `false`             | 是否支持回车提交                       |
| scrollToError | `boolean`                          | `true`              | 校验失败时是否滚动到错误字段                 |
| scrollProps   | `object`                           | `{block: 'center'}` | 滚动配置，参考 Element.scrollIntoView |
| onSubmit      | `function`                         | -                   | 表单提交回调函数                       |

---

### Input 输入框

文本输入框组件，支持密码输入。

#### 属性

| 属性          | 类型        | 默认值     | 描述       |
|-------------|-----------|---------|----------|
| name        | `string`  | -       | 字段名称（必填） |
| label       | `string`  | -       | 字段标签     |
| rule        | `string`  | -       | 校验规则     |
| realtime    | `boolean` | `false` | 是否实时校验   |
| placeholder | `string`  | -       | 占位文本     |
| disabled    | `boolean` | `false` | 是否禁用     |

#### Input.Password 密码输入框

与 Input 属性相同，显示为密码输入框。

---

### InputNumber 数字输入框

#### 属性

| 属性        | 类型         | 默认值 | 描述       |
|-----------|------------|-----|----------|
| name      | `string`   | -   | 字段名称（必填） |
| label     | `string`   | -   | 字段标签     |
| rule      | `string`   | -   | 校验规则     |
| min       | `number`   | -   | 最小值      |
| max       | `number`   | -   | 最大值      |
| step      | `number`   | `1` | 步长       |
| precision | `number`   | -   | 小数精度     |
| formatter | `function` | -   | 格式化显示值   |
| parser    | `function` | -   | 解析输入值    |

---

### TextArea 多行文本

#### 属性

| 属性        | 类型                  | 默认值     | 描述       |
|-----------|---------------------|---------|----------|
| name      | `string`            | -       | 字段名称（必填） |
| label     | `string`            | -       | 字段标签     |
| rule      | `string`            | -       | 校验规则     |
| rows      | `number`            | `4`     | 行数       |
| maxLength | `number`            | -       | 最大字符数    |
| showCount | `boolean`           | `false` | 是否显示字符数  |
| autoSize  | `boolean \| object` | `false` | 自适应高度    |

---

### Select 选择器

#### 属性

| 属性           | 类型                     | 默认值     | 描述                      |
|--------------|------------------------|---------|-------------------------|
| name         | `string`               | -       | 字段名称（必填）                |
| label        | `string`               | -       | 字段标签                    |
| rule         | `string`               | -       | 校验规则                    |
| options      | `array`                | -       | 选项数据 `[{label, value}]` |
| mode         | `'multiple' \| 'tags'` | -       | 模式                      |
| showSearch   | `boolean`              | `false` | 是否可搜索                   |
| filterOption | `function`             | -       | 搜索过滤函数                  |

---

### TreeSelect 树选择

#### 属性

| 属性            | 类型        | 默认值     | 描述       |
|---------------|-----------|---------|----------|
| name          | `string`  | -       | 字段名称（必填） |
| label         | `string`  | -       | 字段标签     |
| rule          | `string`  | -       | 校验规则     |
| treeData      | `array`   | -       | 树形数据     |
| treeCheckable | `boolean` | `false` | 是否可多选    |
| showSearch    | `boolean` | `false` | 是否可搜索    |

---

### Cascader 级联选择

#### 属性

| 属性         | 类型        | 默认值     | 描述       |
|------------|-----------|---------|----------|
| name       | `string`  | -       | 字段名称（必填） |
| label      | `string`  | -       | 字段标签     |
| rule       | `string`  | -       | 校验规则     |
| options    | `array`   | -       | 级联数据     |
| showSearch | `boolean` | `false` | 是否可搜索    |

---

### DatePicker 日期选择

#### 属性

| 属性           | 类型                  | 默认值            | 描述       |
|--------------|---------------------|----------------|----------|
| name         | `string`            | -              | 字段名称（必填） |
| label        | `string`            | -              | 字段标签     |
| rule         | `string`            | -              | 校验规则     |
| format       | `string`            | `'YYYY-MM-DD'` | 日期格式     |
| disabledDate | `function`          | -              | 禁用日期函数   |
| showTime     | `boolean \| object` | `false`        | 是否显示时间选择 |

#### DatePicker.RangePicker 日期范围

#### DatePicker.MonthPicker 月份选择

#### DatePicker.WeekPicker 周选择

---

### TimePicker 时间选择

#### 属性

| 属性         | 类型       | 默认值          | 描述       |
|------------|----------|--------------|----------|
| name       | `string` | -            | 字段名称（必填） |
| label      | `string` | -            | 字段标签     |
| rule       | `string` | -            | 校验规则     |
| format     | `string` | `'HH:mm:ss'` | 时间格式     |
| hourStep   | `number` | -            | 小时步长     |
| minuteStep | `number` | -            | 分钟步长     |
| secondStep | `number` | -            | 秒步长      |

#### TimePicker.RangePicker 时间范围

---

### DatePickerToday 快捷日期

带有快捷选项的日期范围选择组件，支持"至今"选项。返回值为数组 `[startDate, endDate]`，当选择"至今"时，endDate 值为
`soFarValue`。

#### 属性

| 属性         | 类型         | 默认值       | 描述                             |
|------------|------------|-----------|--------------------------------|
| name       | `string`   | -         | 字段名称（必填）                       |
| label      | `string`   | -         | 字段标签                           |
| rule       | `string`   | -         | 校验规则                           |
| soFarText  | `string`   | `'至今'`    | "至今"按钮显示的文本                    |
| soFarValue | `string`   | `'soFar'` | 选择"至今"时的结束日期值，可通过此值判断是否选择了至今   |
| onChange   | `function` | -         | 值变化回调 `([start, end]) => void` |

#### 返回值说明

组件返回一个数组 `[startDate, endDate]`：

- `startDate`: 开始日期，ISO 格式字符串（如 `'2024-01-01T00:00:00.000Z'`）
- `endDate`: 结束日期，ISO 格式字符串，或 `soFarValue`（默认 `'soFar'`）

---

### Checkbox 复选框

#### 属性

| 属性       | 类型        | 默认值     | 描述       |
|----------|-----------|---------|----------|
| name     | `string`  | -       | 字段名称（必填） |
| label    | `string`  | -       | 字段标签     |
| rule     | `string`  | -       | 校验规则     |
| disabled | `boolean` | `false` | 是否禁用     |

---

### CheckboxGroup 复选框组

#### 属性

| 属性       | 类型        | 默认值     | 描述                      |
|----------|-----------|---------|-------------------------|
| name     | `string`  | -       | 字段名称（必填）                |
| label    | `string`  | -       | 字段标签                    |
| rule     | `string`  | -       | 校验规则                    |
| options  | `array`   | -       | 选项数据 `[{label, value}]` |
| disabled | `boolean` | `false` | 是否禁用                    |

---

### RadioGroup 单选框组

#### 属性

| 属性          | 类型                      | 默认值         | 描述                      |
|-------------|-------------------------|-------------|-------------------------|
| name        | `string`                | -           | 字段名称（必填）                |
| label       | `string`                | -           | 字段标签                    |
| rule        | `string`                | -           | 校验规则                    |
| options     | `array`                 | -           | 选项数据 `[{label, value}]` |
| optionType  | `'default' \| 'button'` | `'default'` | 选项类型                    |
| buttonStyle | `'outline' \| 'solid'`  | `'outline'` | 按钮样式                    |

---

### Rate 评分

#### 属性

| 属性         | 类型          | 默认值     | 描述       |
|------------|-------------|---------|----------|
| name       | `string`    | -       | 字段名称（必填） |
| label      | `string`    | -       | 字段标签     |
| rule       | `string`    | -       | 校验规则     |
| count      | `number`    | `5`     | 星星数量     |
| allowHalf  | `boolean`   | `false` | 是否允许半星   |
| allowClear | `boolean`   | `true`  | 是否允许清除   |
| character  | `ReactNode` | -       | 自定义字符    |
| disabled   | `boolean`   | `false` | 是否禁用     |

---

### Slider 滑动条

#### 属性

| 属性       | 类型        | 默认值     | 描述       |
|----------|-----------|---------|----------|
| name     | `string`  | -       | 字段名称（必填） |
| label    | `string`  | -       | 字段标签     |
| rule     | `string`  | -       | 校验规则     |
| min      | `number`  | `0`     | 最小值      |
| max      | `number`  | `100`   | 最大值      |
| step     | `number`  | `1`     | 步长       |
| range    | `boolean` | `false` | 是否为范围选择  |
| marks    | `object`  | -       | 刻度标记     |
| vertical | `boolean` | `false` | 是否垂直     |
| disabled | `boolean` | `false` | 是否禁用     |

---

### Switch 开关

#### 属性

| 属性                | 类型                     | 默认值         | 描述       |
|-------------------|------------------------|-------------|----------|
| name              | `string`               | -           | 字段名称（必填） |
| label             | `string`               | -           | 字段标签     |
| rule              | `string`               | -           | 校验规则     |
| checkedChildren   | `ReactNode`            | -           | 选中时的内容   |
| unCheckedChildren | `ReactNode`            | -           | 未选中时的内容  |
| disabled          | `boolean`              | `false`     | 是否禁用     |
| size              | `'default' \| 'small'` | `'default'` | 开关尺寸     |

---

### SubmitButton 提交按钮

#### 属性

| 属性       | 类型        | 默认值         | 描述               |
|----------|-----------|-------------|------------------|
| type     | `string`  | `'primary'` | 按钮类型             |
| realtime | `boolean` | `false`     | 是否实时校验（未通过时禁用按钮） |
| disabled | `boolean` | `false`     | 是否禁用             |
| loading  | `boolean` | `false`     | 是否加载中            |

---

### ResetButton 重置按钮

#### 属性

继承 Ant Design Button 的所有属性。

---

### CancelButton 取消按钮

用于清除表单缓存，需配合 Form 的 cache 属性使用。

#### 属性

继承 Ant Design Button 的所有属性。

| 属性      | 类型         | 默认值 | 描述   |
|---------|------------|-----|------|
| onClick | `function` | -   | 点击回调 |

---

### GroupList 动态表单列表

#### 属性

| 属性            | 类型       | 默认值 | 描述       |
|---------------|----------|-----|----------|
| name          | `string` | -   | 字段名称（必填） |
| defaultLength | `number` | `0` | 默认项数     |

#### 子组件参数

| 参数       | 类型         | 描述    |
|----------|------------|-------|
| index    | `number`   | 当前项索引 |
| onRemove | `function` | 删除当前项 |
| onAdd    | `function` | 添加新项  |

---

### preset 预设配置

用于全局配置表单规则和默认属性。

```javascript
import {preset} from '@kne/react-form-antd';

preset({
    type: 'default',     // 默认表单类型
    size: 'middle',      // 默认表单尺寸
    rules: {             // 自定义校验规则
        PHONE: {
            reg: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号码'
        }
    },
    field: {             // 字段默认属性
        Input: {
            defaultProps: {
                autoComplete: 'off'
            }
        }
    }
});
```
