# 为React组件库添加TypeScript类型定义的通用提示词

## 任务描述

为一个已有的React组件库添加完整的TypeScript类型定义，包括所有组件的Props接口、类型声明和导出。

## 实施步骤

### 1. 创建类型定义文件

在源代码目录创建`index.d.ts`文件，位置与主入口文件`index.js`同级。

### 2. 分析组件结构

- 查看所有组件文件的Props参数
- 确定每个组件的输入属性类型
- 识别回调函数的参数和返回值类型

### 3. 定义基础类型

```typescript
import { ReactNode, ComponentType, FC } from 'react';
```

### 4. 为每个组件创建Props接口

- 组件名 + Props 作为接口名（如：FormInfoProps）
- 所有可选属性使用`?`标记
- ReactNode类型用于支持字符串和JSX元素
- 函数类型明确定义参数和返回值
- 使用`[key: string]: any`支持动态属性

### 5. 处理复杂场景

- **嵌套对象属性**：定义内联对象类型
- **函数属性**：明确参数类型和返回值类型
- **联合类型**：使用`|`支持多种类型
- **泛型组件**：使用ComponentType<any>

### 6. 导出组件类型声明

```typescript
export declare const ComponentName: FC<ComponentNameProps>;
```

## 类型定义模板

### 基础组件Props模板

```typescript
export interface ComponentNameProps {
  className?: string;
  children?: ReactNode;

  // 其他属性...
  [key: string]: any; // 支持动态属性
}
```

### 函数回调模板

```typescript
onEvent ? : (data: any, context: any, ...args: any[]) => Promise<any> | any;
```

### 组件声明模板

```typescript
export declare const ComponentName: FC<ComponentNameProps>;
```

## 最佳实践

1. **类型完整性**：覆盖所有组件的公开API
2. **向后兼容**：保持现有JavaScript代码的正常运行
3. **可选属性**：合理使用可选属性，提供良好的开发体验
4. **文档注释**：为复杂类型添加JSDoc注释
5. **版本控制**：在package.json中指定types字段指向类型文件

## 使用场景

- 为现有组件库添加TypeScript支持
- 提升代码可维护性和开发体验
- 支持IDE智能提示和类型检查
- 便于团队协作和代码审查

## 示例项目结构

```
src/
├── index.js          # 主入口文件
├── index.d.ts        # 类型定义文件（新增）
├── ComponentA.js     # 组件A
├── ComponentB.js     # 组件B
└── ...
```

## 注意事项

- 类型定义文件应与实际组件实现保持同步
- 考虑使用更具体的类型替代`any`类型
- 定期检查和更新类型定义以匹配组件API的变化
- 对于复杂的组件，考虑拆分类型定义到多个文件中