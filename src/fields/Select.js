import {Select, message} from 'antd';
import {hooks} from '@kne/react-form-helper';
import React from 'react';

const {useOnChange} = hooks;

const MSelect = (props) => {
  const {onChange, ...args} = props;
  const selectedChange = (v) => {
    if (args['mode'] === 'multiple' && args['max'] && (v.length > args['max'])) {
        message.warning('最多选择'+args['max']+'项');
        return
    }
    onChange && onChange(v);
  }

  return (
      <Select {...args} onChange={selectedChange}/>
  )
}

const _Select = (props) => {
  const render = useOnChange(props);
  return render(MSelect);
};

_Select.Option = Select.Option;
_Select.OptGroup = Select.OptGroup;

export default _Select;
