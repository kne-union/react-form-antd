import React from 'react';
import {Select} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {withFetch} from '@kne/react-fetch';

const {useOnChange} = hooks;

const _SelectFetch = withFetch(({data, setData, refresh, isLoading, children, ...props}) => {
    return <Select {...props}>{children({data, refresh, isLoading, setData})}</Select>;
});

const SelectFetch = (props) => {
    const render = useOnChange(props);
    return render(_SelectFetch);
};

SelectFetch.Option = Select.Option;
SelectFetch.OptGroup = Select.OptGroup;

export default SelectFetch;
