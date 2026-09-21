import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/**
 * Convert form/API date values to dayjs for antd DatePicker/TimePicker.
 * Newer @rc-component/picker getUDayjs returns non-dayjs values as-is,
 * then calls .isValid() and throws on plain strings.
 */
const toDayjs = (value, format) => {
  if (value == null || value === '') {
    return null;
  }
  if (dayjs.isDayjs(value)) {
    return value;
  }
  if (typeof value === 'string' && typeof format === 'string' && format) {
    const parsed = dayjs(value, format, true);
    if (parsed.isValid()) {
      return parsed;
    }
  }
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed : null;
};

const toDayjsValue = (value, format) => {
  if (Array.isArray(value)) {
    return value.map((item) => toDayjs(item, format));
  }
  return toDayjs(value, format);
};

/**
 * Date-only pickers should emit start of the selected unit (e.g. day at 00:00:00),
 * not "selected date + current clock time".
 */
export const startOfByPicker = (value, picker = 'date') => {
  if (!value || !dayjs.isDayjs(value) || !value.isValid()) {
    return value;
  }
  const unit =
    picker === 'week'
      ? 'week'
      : picker === 'month'
        ? 'month'
        : picker === 'quarter'
          ? 'quarter'
          : picker === 'year'
            ? 'year'
            : 'day';
  return value.startOf(unit);
};

export const normalizeDateValue = (value, picker = 'date') => {
  if (Array.isArray(value)) {
    return value.map((item) => startOfByPicker(item, picker));
  }
  return startOfByPicker(value, picker);
};

export default toDayjsValue;
