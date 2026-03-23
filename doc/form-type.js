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
