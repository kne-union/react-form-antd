import React, {forwardRef, useImperativeHandle, useEffect, useRef} from 'react';
import {Select} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {withFetch} from '@kne/react-fetch';
import useEvent from '@kne/use-event'
import getPopupContainer from "../common/getPopupContainer";

const {useOnChange} = hooks;

const _SelectFetch = withFetch(({
                                    data,
                                    setData,
                                    refresh,
                                    reload,
                                    emitter,
                                    isLoading,
                                    children,
                                    onLoaded,
                                    loadMore,
                                    send,
                                    isComplete,
                                    fetchProps,
                                    requestParams,
                                    ...props
                                }) => {
    const refreshRef = useRef(refresh);
    refreshRef.current = refresh;
    const reloadRef = useRef(reload);
    reloadRef.current = reload
    const setDataRef = useRef(setData);
    setDataRef.current = setData;
    const dataRef = useRef(data);
    useEffect(() => {
        console.warn('请使用Select.Fetch替代该组件，该组件会在未来某个版本被移除');
        const token1 = emitter.addListener('select-fetch-refresh', () => refreshRef.current());
        const token2 = emitter.addListener('select-fetch-reload', () => reloadRef.current());
        const token3 = emitter.addListener('select-fetch-set-data', () => setDataRef.current());
        return () => {
            token1 && token1.remove();
            token2 && token2.remove();
            token3 && token3.remove();
        };
    }, [emitter]);
    useEffect(() => {
        onLoaded && onLoaded(dataRef.current);
    }, []);
    return <Select {...props}>{children({data, refresh, isLoading, setData})}</Select>;
});

const SelectFetch = forwardRef((props, ref) => {
    const emitter = useEvent();
    useImperativeHandle(ref, () => {
        return {
            refresh: () => emitter.emit('select-fetch-refresh'),
            reload: () => emitter.emit('select-fetch-reload'),
            setData: (data) => emitter.emit('select-fetch-set-data', data)
        };
    }, [emitter]);
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props, {emitter}));
    return render(_SelectFetch);
});

SelectFetch.field = forwardRef((props, ref) => {
    const emitter = useEvent();
    useImperativeHandle(ref, () => {
        return {
            refresh: () => emitter.emit('select-fetch-refresh'),
            reload: () => emitter.emit('select-fetch-reload'),
            setData: (data) => emitter.emit('select-fetch-set-data', data)
        };
    }, [emitter]);
    return <_SelectFetch {...props} emitter={emitter}/>
});

SelectFetch.defaultProps = {
    fieldName: 'selectFetch',
    getPopupContainer
};

SelectFetch.Option = Select.Option;
SelectFetch.OptGroup = Select.OptGroup;

export default SelectFetch;
