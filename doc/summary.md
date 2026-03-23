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
