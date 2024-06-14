import React from 'react';
import {useSubmit} from '@kne/react-form';
import {Button} from 'antd';

const SubmitButton = ({realTime, realtime, disabled, ...props}) => {
    const {isPass, isLoading, ...submitProps} = useSubmit(props);
    if (typeof realTime === 'boolean') {
        console.error(`warning: realTime参数已废弃，请使用realtime，后续版本可能回删除realTime的支持`);
    }
    // 如果传入 realtime 优先使用该属性
    return (<Button loading={isLoading}
                    disabled={disabled || ((typeof realtime === 'boolean' ? realtime : realTime) ? !isPass : false)} {...props} {...submitProps}/>);
};

SubmitButton.defaultProps = {
    type: 'primary', disabled: false
};

export default SubmitButton;
