const {Button} = antd;
const {default: Form, Select, Input, Group, GroupList, SubmitButton, DatePickerToday, Rate, Slider} = reactFormAntd;
const {useRef} = React;

const Example = () => {
    const addButton = useRef();
    return <Form debug>
        <Select name="select" label="哈哈哈" options={[{label: 'sss', value: 1}]}/>
        <Input name="name" label="名称" realtime rule="REQ LEN-0-4"/>
        <Input.Password name="password" label="密码"/>
        <Rate name="rate" label="评分"/>
        <Slider name="slider" label="滑动条"/>
        <br/>
        <Input name="target[0].name" label="名称"/>
        <Input name="target[0].des" label="描述"/>
        <Input name="target[1].name" label="名称"/>
        <Input name="target[1].des" label="描述"/>
        <br/>
        <div>
            <Button onClick={() => {
                addButton.current.onAdd();
            }}>添加</Button>
        </div>
        <GroupList name="list" ref={addButton}>
            {({onRemove}) => {
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

render(<Example/>);
