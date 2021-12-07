import {Button, DatePicker} from 'antd';
import React, {useState, useRef, useEffect, useMemo} from 'react'
import moment from 'moment'
import get from 'lodash/get'
// import { useFormContext, useField } from '@kne/react-form';

const RangePickerToday = (props) => {
  // const _useFormContext = useFormContext();
  // const fields = _useFormContext.fields;
  // const emitter = _useFormContext.emitter;
  // console.log('???????');

  const [value1, setV1] = useState();
  const [value2, setV2] = useState();
  const ref_d = useRef();
  const [showZj, setZJ] = useState(); // 至今
  const [placeholder, setPlaceholder] = useState();

  useMemo(() => {
    console.log(props);
    if (props.value) {
      const s = get(props, ['value', 0], '') || '';
      setV1(s ? moment(s) : '');
      const d = get(props, ['value', 1], '') || '';
      d === '至今' ? setV2(moment('2999-09-09')) : setV2(d ? moment(d) : '');
      setZJ(d === '至今');
    }
    setPlaceholder(props.placeholder || '结束日期');
  }, [props.value]);

  // useEffect(() => {
  //   console.log(showZj);
  // }, [showZj]);

  const change1 = (v) => {
    if (!showZj && value2 && v) { // 日期大小比较交换
      value2.isBefore(v);
      props.onChange && props.onChange([value2, v]);
      setV2(v);
      setV1(value2);
      return
    }
    setV1(v);
    props.onChange && props.onChange([v, value2]);
    ref_d.current.focus();
  };

  const change2 = (v) => {
    setZJ(false);
    console.log('xxxxxxxxxx', showZj, value1);
    if (value1 && v) { // 日期大小比较交换
      v.isBefore(value1);
      props.onChange && props.onChange([v, value1]);
      setV2(value1);
      setV1(v);
      return
    }
    setV2(v);
    setPlaceholder(props.placeholder || '');
    props.onChange && props.onChange([value1, v]);
  };


  const foot = () => {
    return (
        <Button onClick={(v) => {
          console.log('click');
          console.log(ref_d.current);
          setZJ(true);
          setPlaceholder('');
          // emitter.emit('form-data-set', {
          //   time: moment('2999-09-09')
          // });
          // form.setFieldsValue()
          // ref_d.value = moment('2999-09-09');
          ref_d.current.blur();
          setV2(moment('2099-09-09'));
          props.onChange && props.onChange([value1, '至今']);
        }}>
          至今
        </Button>
    )
  }
  return (
      <div style={{display: 'flex'}}>
        <DatePicker {...{showToday: false, placeholder: '开始日期', ...props, value: value1}} onChange={change1}/>
        {/*<div style={{'color': 'rgba(0, 0, 0, 0.85)'}}>__</div>*/}
        <div className={'svg_box'}>
          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="swap-right" width="1em" height="1em"
               fill="currentColor" aria-hidden="true">
            <path
                d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"/>
          </svg>
        </div>
        <div className={showZj ? 'data_range_picker data_range_picker_dis' : 'data_range_picker'}>
          <span className={showZj ? 'zhijin zhijin_show' : 'zhijin'}>至今</span>
          <DatePicker {...{showToday: false, placeholder: placeholder, ...props, value: value2}} ref={ref_d}
                      onChange={change2} renderExtraFooter={foot}/>
        </div>
      </div>
  );
}

export default RangePickerToday;
