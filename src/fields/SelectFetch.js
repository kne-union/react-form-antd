import React from 'react';
import {withFetch} from '@kne/react-fetch';
import {Select} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const _SelectFetch = withFetch(({data, setData, refresh, children, ...props}) => {
    return <Select {...props}>{children({data, refresh, setData})}</Select>;
});

const SelectFetch = (props) => {
    const render = useOnChange(props);
    return render(_SelectFetch);
};

SelectFetch.Option = Select.Option;
SelectFetch.OptGroup = Select.OptGroup;

export default SelectFetch;
