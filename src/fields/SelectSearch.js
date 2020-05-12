import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useFetch} from '@kne/react-fetch';
import {useOnChange} from '../hooks/useDecorator';
import {useDebouncedCallback} from 'use-debounce';
import Select from 'antd/es/select';

const _SelectSearch = ({fetcher, children, debounce, notFoundContent, filterOption, ...props}) => {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState([]);
    const [fetch] = useDebouncedCallback((searchText) => {
        searchText && refresh();
    }, [debounce]);
    const {results, isComplete, refresh} = useFetch(Object.assign({}, fetcher(searchText), {auto: false}));

    useEffect(() => {
        if (isComplete) {
            setList(results);
        }
    }, [results, isComplete]);

    return <Select {...props} notFoundContent={notFoundContent} showSearch
                   filterOption={filterOption}
                   onSearch={(text) => {
                       setSearchText(text);
                       fetch(text);
                   }}>
        {children(list)}
    </Select>;
};

_SelectSearch.defaultProps = {
    debounce: 500,
    notFoundContent: null,
    filterOption: (input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
};

_SelectSearch.propTypes = {
    debounce: PropTypes.number,
    notFoundContent: PropTypes.node,
    filterOption: PropTypes.func
};

const SelectSearch = (props) => {
    const render = useOnChange(props);
    return render(_SelectSearch);
};

SelectSearch.Option = Select.Option;
SelectSearch.OptGroup = Select.OptGroup;

export default SelectSearch;
