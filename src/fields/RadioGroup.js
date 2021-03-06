import React, {useCallback} from 'react';
import {useOnChange} from '../hooks/useDecorator';
import Radio from 'antd/es/radio';

const RadioGroup = ({onChange, ...props})=>{
    const handler = useCallback((e) => {
        onChange && onChange(e.target.value);
    }, [onChange]);
    return <Radio.Group {...props} onChange={handler}/>
};

const _RadioGroup = (props) => {
    const render = useOnChange(props);
    return render(RadioGroup);
};

_RadioGroup.Radio = Radio;

export default _RadioGroup;
