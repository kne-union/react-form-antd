import {useRef, useImperativeHandle, useEffect, useCallback} from 'react';
import debounce from 'lodash/debounce';

export default ({triggerValidate, debounce: time = 0, value, onChange, ...others}) => {
    const debounceValidate = useCallback(debounce((callback) => callback(), time), []),
        hasChanged = useRef(false), validate = useRef(null);

    useImperativeHandle(validate, () => triggerValidate);
    const handlerChange = useCallback((...args) => {
        onChange && onChange(...args);
        hasChanged.current = true;
    }, [onChange]);

    useEffect(() => {
        hasChanged.current && debounceValidate(validate.current);
    }, [value, debounceValidate]);

    return {
        value,
        onChange: handlerChange,
        ...others
    };
};
