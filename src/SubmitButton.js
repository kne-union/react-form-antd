import React from 'react';
import {useSubmit} from '@kne/react-form';
import Button from 'antd/es/button';

const SubmitButton = (props) => {
    const {isPass, isLoading,...submitProps} = useSubmit(props);
    return (
        <Button loading={isLoading} {...submitProps} {...props}/>
    );
};

export default SubmitButton;
