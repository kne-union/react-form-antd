import {useCallback} from 'react';

export default ({triggerValidate, onBlur, ...others}) => {
    const handlerBlur = useCallback((...args) => {
        onBlur && onBlur(...args);
        triggerValidate();
    }, [onBlur, triggerValidate]);
    return {
        onBlur: handlerBlur,
        ...others
    };
};
