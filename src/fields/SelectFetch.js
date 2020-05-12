import React from 'react';
import {withFetch} from '@kne/react-fetch';
import {useOnChange} from '../hooks/useDecorator';
import Select from 'antd/es/select';

const _SelectFetch = withFetch(({data, refresh, children, ...props}) => {
    return <Select {...props}>{children(data, refresh)}</Select>;
});

const SelectFetch = (props) => {
    const render = useOnChange(props);
    return render(_SelectFetch);
};

SelectFetch.Option = Select.Option;
SelectFetch.OptGroup = Select.OptGroup;

export default SelectFetch;
