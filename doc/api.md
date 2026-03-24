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

| 属性         | 类型                                       | 默认值       | 描述                             |
|------------|------------------------------------------|-----------|--------------------------------|
| name       | `string`                                 | -         | 字段名称（必填）                       |
| label      | `string`                                 | -         | 字段标签                           |
| rule       | `string`                                 | -         | 校验规则                           |
| picker     | `'date' \| 'week' \| 'month' \| 'year'` | `'date'`  | 选择器类型                          |
| soFarText  | `string`                                 | `'至今'`    | "至今"按钮显示的文本                    |
| soFarValue | `string`                                 | `'soFar'` | 选择"至今"时的结束日期值，可通过此值判断是否选择了至今   |
| onChange   | `function`                               | -         | 值变化回调 `([start, end]) => void` |

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
