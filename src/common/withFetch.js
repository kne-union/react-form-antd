import React, {forwardRef, useImperativeHandle, useEffect, useRef} from 'react';
import useEvent from "@kne/use-event";
import {hooks} from "@kne/react-form-helper";
import {withFetch as withReactFetch} from '@kne/react-fetch';

const {useOnChange} = hooks;

const withFetch = (WrappedComponent) => {
    const FieldInner = withReactFetch(({
                                           data,
                                           setData,
                                           send,
                                           loadMore,
                                           isComplete,
                                           refresh,
                                           reload,
                                           fetchEmitter,
                                           isLoading,
                                           children,
                                           onLoaded,
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
            const token1 = fetchEmitter.addListener('select-fetch-refresh', () => refreshRef.current());
            const token2 = fetchEmitter.addListener('select-fetch-reload', () => reloadRef.current());
            const token3 = fetchEmitter.addListener('select-fetch-set-data', () => setDataRef.current());
            return () => {
                token1 && token1.remove();
                token2 && token2.remove();
                token3 && token3.remove();
            };
        }, [fetchEmitter]);
        useEffect(() => {
            onLoaded && onLoaded(dataRef.current);
        }, []);
        return <WrappedComponent {...props} {...children({
            data,
            fetchProps,
            loadMore,
            send,
            refresh,
            reload,
            isLoading,
            isComplete,
            setData
        })}/>;
    });

    const useFetchEmitter = (ref) => {
        const emitter = useEvent();
        useImperativeHandle(ref, () => {
            return {
                refresh: () => emitter.emit('select-fetch-refresh'),
                reload: () => emitter.emit('select-fetch-reload'),
                setData: (data) => emitter.emit('select-fetch-set-data', data)
            };
        }, [emitter]);
        return emitter;
    };

    const Fetch = forwardRef((props, ref) => {
        const emitter = useFetchEmitter(ref);
        const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props, {fetchEmitter: emitter}));
        return render(FieldInner);
    });

    Fetch.field = forwardRef((props, ref) => {
        const emitter = useFetchEmitter(ref);

        return <FieldInner {...props} fetchEmitter={emitter}/>;
    });

    return Fetch;
};

export default withFetch;
