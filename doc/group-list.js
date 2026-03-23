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
                                <Card key={index} title={`联系人 ${index + 1}`} size="small" extra={<Button danger size="small" onClick={onRemove}>删除</Button>}>
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
                                <Card key={index} size="small" title={`成员 ${index + 1}`} extra={<Button danger size="small" onClick={onRemove}>删除</Button>}>
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
