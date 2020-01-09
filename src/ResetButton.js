import React from 'react';
import {useReset} from '@kne/react-form';
import Button from 'antd/es/button';

const ResetButton = (props) => {
    const submitProps = useReset(props);
    return (
        <Button {...submitProps}/>
    );
};

export default ResetButton;
