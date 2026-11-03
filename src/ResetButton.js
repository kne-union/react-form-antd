import React from 'react';
import {useReset} from '@kne/react-form';
import {Button} from 'antd';
import classnames from 'classnames';

const ResetButton = ({className, ...props}) => {
    const resetProps = useReset();
    return (
        <Button {...resetProps} {...props} className={classnames('react-form__action-button', className)}/>
    );
};

export default ResetButton;
