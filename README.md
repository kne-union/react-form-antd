
# react-form-antd


### 描述

把 @kne/react-form 表单校验逻辑应用到antd


### 安装

```shell
npm i --save @kne/react-form-antd
```


### 概述

#### 特点

* UI分离，支持自定义UI框架。提供了antd的组件封装 @kne/react-form-antd 和 taro的组件封装 @kne/react-form-taro
* 分级校验规则配置，校验规则支持异步校验
* 事件驱动，方便灵活扩展。可以通过debug选项配置，通过触发事件顺序和参数轻松调试
* 支持包含Group的复杂表单，子表单


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- reactFormAntd(@kne/react-form-antd),(@kne/react-form-antd/dist/index.css),antd(antd)

```jsx
const {Button} = antd;
const {Form, Select, Input, Group, GroupList, SubmitButton, DatePickerToday} = reactFormAntd;
const {useRef} = React;

const Example = () => {
    const addButton = useRef();
    return <Form>
        <Select name="select" label="哈哈哈" options={[{label: 'sss', value: 1}]}/>
        <Input name="name" label="名称" realtime rule="REQ LEN-0-4"/>
        <Input.Password name="password" label="密码"/>
        <br/>
        <Group name="target">
            <Input name="name" label="名称"/>
            <Input name="des" label="描述"/>
        </Group>
        <Group name="target">
            <Input name="name" label="名称"/>
            <Input name="des" label="描述"/>
        </Group>
        <br/>
        <div>
            <Button onClick={() => {
                addButton.current.onAdd();
            }}>添加</Button>
        </div>
        <GroupList name="list" ref={addButton}>
            {(key, {onRemove}) => {
                return <div>
                    <Button onClick={onRemove}>删除</Button>
                    <Input name="name" label="名称"/>
                    <Input name="des" label="描述"/>
                </div>;
            }}
        </GroupList>
        <DatePickerToday label="时间" name="time" selectToday={true}/>
        <SubmitButton>提交</SubmitButton>
    </Form>
};

render(<Example />);

```


### API


