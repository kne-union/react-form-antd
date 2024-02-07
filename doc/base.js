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
