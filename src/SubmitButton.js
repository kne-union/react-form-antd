import React from 'react';
import {useSubmit} from '@kne/react-form';
import {Button} from 'antd';

const SubmitButton = (props) => {
    const {isPass, isLoading, ...submitProps} = useSubmit(props);
    return (<Button loading={isLoading} {...submitProps} {...props}/>);
};

SubmitButton.defaultProps = {
    type: 'primary'
};

export default SubmitButton;
