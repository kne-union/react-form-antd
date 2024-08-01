import React from 'react';
import {useSubmit} from '@kne/react-form';
import {Button} from 'antd';

const SubmitButton = ({type = 'primary', realtime, disabled = false, ...props}) => {
    const {isPass, isLoading, ...submitProps} = useSubmit(props);
    return (<Button type={type} loading={isLoading}
                    disabled={disabled || (realtime ? !isPass : false)} {...props} {...submitProps}/>);
};

export default SubmitButton;
