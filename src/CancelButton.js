import React from 'react';
import {hooks} from '@kne/react-form-helper';
import {Button} from 'antd';

const {useCacheRemove} = hooks;

const CancelButton = ({onClick, ...props}) => {
    const remove = useCacheRemove();
    return (<Button {...props} onClick={(...args) => {
        remove();
        onClick && onClick(...args);
    }}/>);
};

export default CancelButton;
