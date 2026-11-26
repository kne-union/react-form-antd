const {Checkbox, CheckboxGroup, RadioGroup, CheckboxGroupOther, RadioGroupOther} = _ReactFormAntd;
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

            <Card title="RadioGroupOther / CheckboxGroupOther 带「其他」选项" size="small">
                <Form onSubmit={setFormData} data={{
                    channel: {value: 'other', other: '朋友推荐'},
                    benefits: {value: ['insurance', 'other'], other: '弹性工作制'}
                }}>
                    <Flex vertical gap={16}>
                        <RadioGroupOther
                            name="source"
                            label="了解渠道"
                            rule="REQ"
                            options={[
                                {label: '招聘网站', value: 'website'},
                                {label: '公众号', value: 'wechat'},
                                {label: '校园宣讲', value: 'campus'}
                            ]}
                        />
                        <RadioGroupOther
                            name="channel"
                            label="推荐来源（回显）"
                            options={[
                                {label: '内部推荐', value: 'referral'},
                                {label: '猎头', value: 'headhunter'}
                            ]}
                            otherOption={{label: '其他来源', value: 'custom'}}
                        />
                        <CheckboxGroupOther
                            name="reasons"
                            label="离职原因"
                            rule="REQ"
                            options={[
                                {label: '薪资待遇', value: 'salary'},
                                {label: '职业发展', value: 'career'},
                                {label: '通勤距离', value: 'commute'}
                            ]}
                            otherProps={{placeholder: '请描述其他离职原因', maxLength: 200, showCount: true}}
                        />
                        <CheckboxGroupOther
                            name="benefits"
                            label="期望福利（回显）"
                            options={[
                                {label: '五险一金', value: 'insurance'},
                                {label: '带薪年假', value: 'vacation'},
                                {label: '餐补', value: 'meal'}
                            ]}
                        />
                    </Flex>
                </Form>
            </Card>

            <Card title="新版样式 modern（行内）" size="small">
                <Form onSubmit={setFormData} data={{workMode: 'hybrid', skills: ['react', 'node']}}>
                    <Flex vertical gap={16}>
                        <RadioGroup
                            name="workMode"
                            label="工作方式"
                            modern
                            options={[
                                {label: '坐班', value: 'office'},
                                {label: '远程', value: 'remote'},
                                {label: '混合办公', value: 'hybrid'}
                            ]}
                        />
                        <CheckboxGroup
                            name="skills"
                            label="技能栈（仅打勾）"
                            modern
                            indexType="check"
                            rule="REQ"
                            options={[
                                {label: 'React', value: 'react'},
                                {label: 'Vue', value: 'vue'},
                                {label: 'Node.js', value: 'node'},
                                {label: 'TypeScript', value: 'ts'},
                                {label: 'Go', value: 'go', disabled: true}
                            ]}
                        />
                        <RadioGroupOther
                            name="education"
                            label="最高学历（数字序号）"
                            modern
                            indexType="number"
                            options={[
                                {label: '本科', value: 'bachelor'},
                                {label: '硕士', value: 'master'},
                                {label: '博士', value: 'doctor'}
                            ]}
                        />
                        <SubmitButton>提交</SubmitButton>
                    </Flex>
                </Form>
            </Card>

            <Card title="新版样式 modern + block（问卷长题）" size="small">
                <Form type="inner" onSubmit={setFormData} data={{conflict: 'communicate'}}>
                    <Flex vertical gap={16}>
                        <RadioGroup
                            name="conflict"
                            label="1. 当你与团队成员在技术方案上产生明显分歧，且项目交付时间非常紧迫时，你通常会如何处理？"
                            modern
                            block
                            rule="REQ"
                            options={[
                                {label: '坚持自己的方案，并通过数据和过往案例说服对方，确保技术决策的正确性', value: 'insist'},
                                {label: '主动发起一次简短的讨论会，列出各方案的利弊，与团队一起快速达成共识', value: 'communicate'},
                                {label: '优先保证交付进度，先按对方方案执行，在项目复盘时再提出自己的改进建议', value: 'compromise'},
                                {label: '将问题上报给直属上级或技术负责人，由其做出最终决定', value: 'escalate'}
                            ]}
                        />
                        <CheckboxGroup
                            name="motivation"
                            label="2. 在选择一份新工作时，以下哪些因素对你的决策影响最大？（可多选）"
                            modern
                            block
                            rule="REQ"
                            options={[
                                {label: '薪酬福利具有市场竞争力，并且有清晰透明的调薪与晋升机制', value: 'salary'},
                                {label: '团队技术氛围浓厚，有资深的导师带教，能够持续学习和成长', value: 'growth'},
                                {label: '工作与生活能够保持平衡，支持弹性工作或部分远程办公', value: 'balance'},
                                {label: '公司业务处于快速发展阶段，个人工作成果能够直接影响业务结果', value: 'impact', disabled: true}
                            ]}
                        />
                        <RadioGroupOther
                            name="channel"
                            label="3. 你最初是通过什么渠道了解到我们公司的这个职位的？"
                            modern
                            block
                            options={[
                                {label: '招聘网站上的职位推荐或主动搜索', value: 'website'},
                                {label: '公司现有员工的内部推荐', value: 'referral'},
                                {label: '技术社区、公众号文章或线下技术分享活动', value: 'community'}
                            ]}
                        />
                        <CheckboxGroupOther
                            name="expect"
                            label="4. 如果入职，你希望在前三个月获得哪些方面的支持？（可多选）"
                            modern
                            block
                            otherProps={{placeholder: '请描述你希望获得的其他支持', maxLength: 200, showCount: true}}
                            options={[
                                {label: '系统的业务与技术栈培训，帮助快速熟悉项目', value: 'training'},
                                {label: '明确的试用期目标与定期的一对一反馈', value: 'feedback'},
                                {label: '参与核心项目的机会，尽早承担有挑战性的任务', value: 'project'}
                            ]}
                        />
                        <SubmitButton>提交</SubmitButton>
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
