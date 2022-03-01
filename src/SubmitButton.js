import React from 'react';
import {useSubmit} from '@kne/react-form';
import {Button} from 'antd';

const SubmitButton = ({realTime, disabled, ...props}) => {
    const {isPass, isLoading, ...submitProps} = useSubmit(props);
    return (
        <Button loading={isLoading} disabled={disabled || (realTime ? !isPass : false)} {...submitProps} {...props}/>);
};

SubmitButton.defaultProps = {
    type: 'primary', disabled: false
};

export default SubmitButton;
