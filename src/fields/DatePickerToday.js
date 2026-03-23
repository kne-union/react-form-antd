import {Button, DatePicker, Input} from 'antd';
import {CalendarOutlined, CloseCircleFilled} from '@ant-design/icons';
import React, {useRef, useMemo, useCallback, useState} from 'react'
import dayjs from 'dayjs'
import useControlValue from '@kne/use-control-value'
import {hooks} from '@kne/react-form-helper';
import withLocale, {useIntl} from '../withLocale';

const {useOnChange} = hooks;

const PickerTodayInner = ({soFarText, soFarValue = 'soFar', ...props}) => {
    const {formatMessage} = useIntl();
    const [data, onChange] = useControlValue(props);
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [tempStart, setTempStart] = useState(null); // 临时存储开始时间
    const [tempEnd, setTempEnd] = useState(null); // 临时存储结束时间
    const [hovering, setHovering] = useState(false); // hover 状态
    const containerRef = useRef(null);
    const isSwitchingRef = useRef(false); // 标记是否正在切换到结束时间选择

    const soFarLabel = soFarText || formatMessage({id: 'SoFar'});

    // 判断是否有值
    const hasValue = useMemo(() => {
        const [start, end] = data || [];
        return !!(start || end);
    }, [data]);

    // 判断是否为"至今"
    const isSoFar = useMemo(() => {
        const [, end] = data || [];
        return end === soFarValue;
    }, [data, soFarValue]);

    // 解析数据
    const parsedValue = useMemo(() => {
        const [start, end] = data || [];
        return {
            start: start ? dayjs(start) : null, end: isSoFar ? null : (end ? dayjs(end) : null)
        };
    }, [data, isSoFar]);

    // 显示文本 - 弹窗打开时显示临时值，关闭后显示实际值
    const displayText = useMemo(() => {
        // 开始时间：有临时值时显示临时值
        const startText = tempStart
            ? tempStart.format('YYYY-MM-DD')
            : (parsedValue.start ? parsedValue.start.format('YYYY-MM-DD') : '');

        // 结束时间：有临时值时显示临时值
        const endText = tempEnd
            ? tempEnd.format('YYYY-MM-DD')
            : (isSoFar ? soFarLabel : (parsedValue.end ? parsedValue.end.format('YYYY-MM-DD') : ''));

        return {start: startText, end: endText};
    }, [parsedValue, isSoFar, soFarLabel, tempStart, tempEnd]);

    // 点击整个Input框时，先弹出开始时间选择
    const handleInputClick = useCallback(() => {
        const [start] = data || [];
        setTempStart(start ? dayjs(start) : null);
        setOpenStart(true);
        setOpenEnd(false);
    }, [data]);

    // 清除值
    const handleClear = useCallback((e) => {
        e.stopPropagation();
        onChange([]);
        setTempStart(null);
        setTempEnd(null);
        setOpenStart(false);
        setOpenEnd(false);
    }, [onChange]);

    // 处理开始时间变化
    const handleStartChange = useCallback((date) => {
        setTempStart(date);
        isSwitchingRef.current = true; // 标记正在切换
        setOpenStart(false);
        setTimeout(() => {
            setOpenEnd(true);
            isSwitchingRef.current = false;
        }, 100);
    }, []);

    // 处理结束时间变化（选择日期时实时更新显示，选择后确认值）
    const handleEndChange = useCallback((date) => {
        if (date) {
            // 选择了有效日期，确认值
            if (!tempStart) return;
            onChange([tempStart.toISOString(), date.toISOString()]);
            setOpenEnd(false);
            setTempStart(null);
            setTempEnd(null);
        } else {
            // 清空选择
            setTempEnd(null);
        }
    }, [tempStart, onChange]);

    // 点击"至今"按钮
    const handleSoFarClick = useCallback(() => {
        if (!tempStart) return;
        onChange([tempStart.toISOString(), soFarValue]);
        setOpenEnd(false);
        setTempStart(null);
        setTempEnd(null);
    }, [tempStart, onChange, soFarValue]);

    // 处理开始时间弹窗关闭（未完成选择）
    const handleStartOpenChange = useCallback((open) => {
        if (!open) {
            setOpenStart(false);
            // 如果不是正在切换到结束时间，则清空临时状态
            if (!isSwitchingRef.current) {
                setTempStart(null);
            }
        }
    }, []);

    // 处理结束时间弹窗关闭（未完成选择）
    const handleEndOpenChange = useCallback((open) => {
        if (!open) {
            setOpenEnd(false);
            // 关闭结束时间弹窗时，不修改field值
            setTempStart(null);
            setTempEnd(null);
        }
    }, []);

    // 结束时间面板变化时更新临时值（用于实时显示）
    const handleEndPanelChange = useCallback((date) => {
        setTempEnd(date);
    }, []);

    // 空的 footer（用于开始时间，保持高度一致）
    const renderEmptyFooter = useCallback(() => (<div style={{height: 40}}/>), []);

    // 带至今按钮的 footer
    const renderExtraFooter = useCallback(() => {
        const isCurrentSoFar = !tempStart && isSoFar;
        return (<div style={{textAlign: 'right'}}>
            <Button type={isCurrentSoFar ? 'primary' : 'default'} onClick={handleSoFarClick}>
                {soFarLabel}
            </Button>
        </div>);
    }, [isSoFar, tempStart, handleSoFarClick, soFarLabel]);

    // 结束时间的可选日期（不能早于开始时间）
    const endDisabledDate = useCallback((current) => {
        if (!tempStart) return false;
        return current && current < tempStart.startOf('day');
    }, [tempStart]);

    return (<div className="date-picker-today-container" ref={containerRef}>
        <div 
            className="date-picker-today-inputs" 
            onClick={handleInputClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div className="date-picker-today-start">
                <input
                    readOnly
                    placeholder={formatMessage({id: 'StartDate'})}
                    value={displayText.start}
                    className="ant-input"
                />
            </div>
            <span className="date-picker-today-separator">~</span>
            <div className="date-picker-today-end">
                <input
                    readOnly
                    placeholder={formatMessage({id: 'EndDate'})}
                    value={displayText.end}
                    className={`ant-input ${isSoFar ? 'so-far-active' : ''}`}
                />
            </div>
            <span className="date-picker-today-suffix">
                {hasValue && hovering ? (
                    <CloseCircleFilled className="date-picker-today-clear" onClick={handleClear} />
                ) : (
                    <CalendarOutlined />
                )}
            </span>
        </div>

        {/* 开始时间 DatePicker */}
        <DatePicker
            open={openStart}
            onOpenChange={handleStartOpenChange}
            value={tempStart || parsedValue.start}
            onChange={handleStartChange}
            renderExtraFooter={renderEmptyFooter}
            showNow={false}
            getPopupContainer={() => containerRef.current || document.body}
            style={{width: 0, height: 0, visibility: 'hidden', position: 'absolute'}}
            placement="bottomLeft"
        />

        {/* 结束时间 DatePicker */}
        <DatePicker
            open={openEnd}
            onOpenChange={handleEndOpenChange}
            value={tempEnd || parsedValue.end}
            onChange={handleEndChange}
            onPanelChange={handleEndPanelChange}
            disabledDate={endDisabledDate}
            renderExtraFooter={renderExtraFooter}
            showNow={false}
            getPopupContainer={() => containerRef.current || document.body}
            style={{width: 0, height: 0, visibility: 'hidden', position: 'absolute'}}
            placement="bottomLeft"
        />
    </div>);
};

const PickerToday = withLocale(PickerTodayInner);

const RangePickerToday = (props) => {
    props = Object.assign({}, {
        fieldName: 'rangePickerToday'
    }, props);
    const render = useOnChange(props);
    return render(PickerToday);
};

RangePickerToday.Field = PickerToday;

export default RangePickerToday;
