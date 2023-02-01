import {Button, DatePicker} from 'antd';
import React, {useRef, useEffect, useMemo} from 'react'
import dayjs from 'dayjs'
import get from 'lodash/get'
import useControlValue from '@kne/use-control-value'
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const PickerToday = ({soFarText, ...props}) => {
    const [data, onChange] = useControlValue(props);
    const ref_d = useRef();
    const newData = useMemo(() => {
        // console.log('......', data);
        const s = get(data, 0, '');
        const d = get(data, 1, '');
        const p = get(props, ['placeholder'], ['开始日期', '结束日期']);
        return {
            start: s ? dayjs(s) : '',
            end: d === '至今' ? null : (d ? dayjs(d) : ''),
            showZj: d === '至今',
            placeholder: p
        }
    }, [data]);

    const startChange = (v) => {
        // 比较日期大小
        if (!newData.showZj && newData.end && v && newData.end.isBefore(v)) {
            onChange([newData.end, v]);
            return
        }
        onChange([v || '', newData.showZj ? '至今' : newData.end]);
    };

    const endChange = (v) => {
        if (newData.start && v && v.isBefore(newData.start)) {
            onChange([v, newData.start]);
            return
        }
        onChange([newData.start, v || '']);
    };

    const foot = () => {
        return (
            <Button type={newData.showZj ? 'primary' : 'default'} onClick={(v) => {
                ref_d.current.blur();
                onChange([newData.start || '', '至今']);
            }}>
                {soFarText || '至今'}
            </Button>
        )
    }
    return (
        <div style={{display: 'flex'}}>
            <DatePicker {...{showToday: false, ...props, placeholder: newData.placeholder[0], value: newData.start}}
                        onChange={startChange}/>
            <div className={'svg_box'}>
                <svg viewBox="0 0 1024 1024" focusable="false" data-icon="swap-right" width="1em" height="1em"
                     fill="currentColor" aria-hidden="true">
                    <path
                        d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"/>
                </svg>
            </div>
            <div className={newData.showZj ? 'data_range_picker data_range_picker_dis' : 'data_range_picker'}>
                <span className={newData.showZj ? 'zhijin zhijin_show' : 'zhijin'}>{soFarText || '至今'}</span>
                <DatePicker {...{
                    showToday: false,
                    ...props,
                    placeholder: newData.showZj ? '' : newData.placeholder[1],
                    value: newData.end
                }} ref={ref_d}
                            onChange={endChange} renderExtraFooter={foot}/>
            </div>
        </div>
    );
}


const RangePickerToday = (props) => {
    const render = useOnChange(props);
    return render(PickerToday);
};

RangePickerToday.defaultProps = {
    fieldName: 'rangePickerToday'
};

RangePickerToday.field = PickerToday;

export default RangePickerToday;
