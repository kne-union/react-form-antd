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
