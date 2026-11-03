import React from 'react';
import {hooks} from '@kne/react-form-helper';
import {Button} from 'antd';
import classnames from 'classnames';

const {useCacheRemove} = hooks;

const CancelButton = ({onClick, className, ...props}) => {
    const remove = useCacheRemove();
    return (<Button {...props} className={classnames('react-form__action-button', className)} onClick={(...args) => {
        remove();
        onClick && onClick(...args);
    }}/>);
};

export default CancelButton;
