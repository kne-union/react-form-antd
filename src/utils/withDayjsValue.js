import React, {forwardRef, useMemo, useCallback} from 'react';
import toDayjsValue, {normalizeDateValue} from './toDayjsValue';

/**
 * Wrap antd picker so string/number initial values from form/API become dayjs.
 * When options.stripTime is true and showTime is off, onChange values are
 * normalized to start of the picker unit (date → 00:00:00).
 */
const withDayjsValue = (WrappedComponent, options = {}) => {
  const {stripTime = false, defaultPicker = 'date'} = options;

  const Component = forwardRef(
    ({value, defaultValue, format, showTime, picker, onChange, ...props}, ref) => {
      const mergedPicker = picker || defaultPicker;
      const shouldStripTime = stripTime && !showTime;

      const mergedValue = useMemo(() => {
        if (value === undefined) {
          return undefined;
        }
        const next = toDayjsValue(value, format);
        return shouldStripTime ? normalizeDateValue(next, mergedPicker) : next;
      }, [value, format, shouldStripTime, mergedPicker]);

      const mergedDefaultValue = useMemo(() => {
        if (defaultValue === undefined) {
          return undefined;
        }
        const next = toDayjsValue(defaultValue, format);
        return shouldStripTime ? normalizeDateValue(next, mergedPicker) : next;
      }, [defaultValue, format, shouldStripTime, mergedPicker]);

      const handleChange = useCallback(
        (next, ...rest) => {
          if (!onChange) {
            return;
          }
          if (shouldStripTime && next != null) {
            onChange(normalizeDateValue(next, mergedPicker), ...rest);
            return;
          }
          onChange(next, ...rest);
        },
        [onChange, shouldStripTime, mergedPicker]
      );

      return (
        <WrappedComponent
          {...props}
          ref={ref}
          format={format}
          showTime={showTime}
          picker={picker}
          value={mergedValue}
          defaultValue={mergedDefaultValue}
          onChange={handleChange}
        />
      );
    }
  );

  Component.displayName = `withDayjsValue(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  Object.keys(WrappedComponent)
    .filter((key) => ['$$typeof', 'render', 'field'].indexOf(key) === -1)
    .forEach((key) => {
      Component[key] = WrappedComponent[key];
    });

  return Component;
};

export default withDayjsValue;
