import {Button, DatePicker, Input} from 'antd';
import {CalendarOutlined, CloseCircleFilled} from '@ant-design/icons';
import React, {useRef, useMemo, useCallback, useState} from 'react'
import dayjs from 'dayjs'
import useControlValue from '@kne/use-control-value'
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import useMobileFieldPopup from '../mobilePopup/useMobileFieldPopup';

const {useOnChange} = hooks;

const PickerTodayInner = ({soFarText, soFarValue = 'soFar', picker = 'date', placeholder, ...props}) => {
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
    const placeholderList = Array.isArray(placeholder) ? placeholder : [];
    const startPlaceholder = placeholderList[0] || formatMessage({id: 'StartDate'});
    const endPlaceholder = placeholderList[1] || formatMessage({id: 'EndDate'});

    // 根据 picker 类型获取格式化字符串
    const formatPattern = useMemo(() => {
        const patterns = {
            date: 'YYYY-MM-DD',
            week: 'YYYY-wo',
            month: 'YYYY-MM',
            year: 'YYYY'
        };
        return patterns[picker] || 'YYYY-MM-DD';
    }, [picker]);

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
            ? tempStart.format(formatPattern)
            : (parsedValue.start ? parsedValue.start.format(formatPattern) : '');

        // 结束时间：有临时值时显示临时值
        const endText = tempEnd
            ? tempEnd.format(formatPattern)
            : (isSoFar ? soFarLabel : (parsedValue.end ? parsedValue.end.format(formatPattern) : ''));

        return {start: startText, end: endText};
    }, [parsedValue, isSoFar, soFarLabel, tempStart, tempEnd, formatPattern]);

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

    // 开始日期确认后切到结束选择。
    // 必须用 onSelect：已有值时再次点选同一天，antd 的 onChange 不会触发，弹层会直接关闭。
    const switchToEndPicker = useCallback((date) => {
        if (!date) {
            return;
        }
        setTempStart(date);
        isSwitchingRef.current = true;
        setOpenStart(false);
        setTimeout(() => {
            setOpenEnd(true);
            isSwitchingRef.current = false;
        }, 100);
    }, []);

    const handleStartSelect = useCallback((date) => {
        switchToEndPicker(date);
    }, [switchToEndPicker]);

    // 结束日期确认（同样用 onSelect，避免与当前结束值相同时无法提交）
    const handleEndSelect = useCallback((date) => {
        if (!date || !tempStart) {
            return;
        }
        onChange([tempStart.toISOString(), date.toISOString()]);
        setOpenEnd(false);
        setTempStart(null);
        setTempEnd(null);
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

    // antd 6 的 DatePicker 不再把 onSelect 交给日期面板（仅 time 还走旧回调）。
    // 相同日期时 onChange / onCalendarChange 也不会触发，所以在格子点击上提交。
    const renderSelectableCell = useCallback((handler) => (current, info) => {
        const originNode = info?.originNode;
        if (!originNode || info.type !== picker) {
            return originNode;
        }
        return React.cloneElement(originNode, {
            onClick: event => {
                const cell = event.currentTarget?.closest?.('.ant-picker-cell');
                if (cell && cell.classList.contains('ant-picker-cell-disabled')) {
                    return;
                }
                handler(current);
                if (typeof originNode.props.onClick === 'function') {
                    originNode.props.onClick(event);
                }
            }
        });
    }, [picker]);

    // 空的 footer（用于开始时间，保持高度一致）
    const renderEmptyFooter = useCallback(() => (<div style={{height: 40}}/>), []);

    // 带至今按钮的 footer
    const renderExtraFooter = useCallback(() => {
        return (<div style={{textAlign: 'right'}}>
            <Button variant="text" color="primary" onClick={handleSoFarClick}>
                {soFarLabel}
            </Button>
        </div>);
    }, [handleSoFarClick, soFarLabel]);

    // 结束时间的可选日期（不能早于开始时间）
    const endDisabledDate = useCallback((current) => {
        if (!tempStart) return false;
        const startOfMap = {
            date: 'day',
            week: 'week',
            month: 'month',
            year: 'year'
        };
        const unit = startOfMap[picker] || 'day';
        return current && current < tempStart.startOf(unit);
    }, [tempStart, picker]);

    const startPopup = useMobileFieldPopup({
        kind: 'picker',
        open: openStart,
        onOpenChange: handleStartOpenChange,
        anchorRef: containerRef
    });
    const endPopup = useMobileFieldPopup({
        kind: 'picker',
        open: openEnd,
        onOpenChange: handleEndOpenChange,
        anchorRef: containerRef
    });

    const setContainerRef = useCallback(node => {
        containerRef.current = node;
        startPopup.setAnchor?.(node);
        endPopup.setAnchor?.(node);
    }, [endPopup.setAnchor, startPopup.setAnchor]);

    return (<div className="date-picker-today-container" ref={setContainerRef}>
        {startPopup.mask}
        {endPopup.mask}
        <div 
            className="date-picker-today-inputs" 
            onClick={handleInputClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div className="date-picker-today-start">
                <input
                    readOnly
                    placeholder={startPlaceholder}
                    value={displayText.start}
                    className="ant-input"
                />
            </div>
            <span className="date-picker-today-separator">~</span>
            <div className="date-picker-today-end">
                <input
                    readOnly
                    placeholder={endPlaceholder}
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
            picker={picker}
            open={openStart}
            onOpenChange={handleStartOpenChange}
            value={tempStart || parsedValue.start}
            cellRender={renderSelectableCell(handleStartSelect)}
            renderExtraFooter={renderEmptyFooter}
            showNow={false}
            getPopupContainer={() => containerRef.current || document.body}
            style={{width: 0, height: 0, visibility: 'hidden', position: 'absolute'}}
            placement="bottomLeft"
            {...startPopup.popupProps}
        />

        {/* 结束时间 DatePicker */}
        <DatePicker
            picker={picker}
            open={openEnd}
            onOpenChange={handleEndOpenChange}
            value={tempEnd || parsedValue.end}
            cellRender={renderSelectableCell(handleEndSelect)}
            onPanelChange={handleEndPanelChange}
            disabledDate={endDisabledDate}
            renderExtraFooter={renderExtraFooter}
            showNow={false}
            getPopupContainer={() => containerRef.current || document.body}
            style={{width: 0, height: 0, visibility: 'hidden', position: 'absolute'}}
            placement="bottomLeft"
            {...endPopup.popupProps}
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
