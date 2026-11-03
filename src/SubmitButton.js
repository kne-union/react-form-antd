import React from 'react';
import {useSubmit} from '@kne/react-form';
import {Button} from 'antd';
import classnames from 'classnames';

const SubmitButton = ({type = 'primary', realtime, disabled = false, className, ...props}) => {
    const {isPass, isLoading, ...submitProps} = useSubmit(props);
    return (<Button type={type} loading={isLoading}
                    disabled={disabled || (realtime ? !isPass : false)} {...props} {...submitProps}
                    className={classnames('react-form__action-button', className)}/>);
};

export default SubmitButton;
