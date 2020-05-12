import {useRef, useEffect, useCallback} from 'react';

export default ({triggerValidate, value, onChange, ...others}) => {
    const hasChanged = useRef(false), validate = useRef();
    const handlerChange = useCallback((...args) => {
        onChange && onChange(...args);
        hasChanged.current = true;
    }, [onChange]);

    useEffect(() => {
        validate.current = triggerValidate;
    }, [triggerValidate]);

    useEffect(() => {
        hasChanged.current && validate.current();
    }, [value]);

    return {
        value,
        onChange: handlerChange,
        ...others
    };
};
