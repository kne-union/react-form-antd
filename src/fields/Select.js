import {Select} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import withMobilePopup from '../mobilePopup/withMobilePopup';

const {useOnChange} = hooks;

const MobileSelect = withMobilePopup(Select, {
    kind: 'select',
    unlockTriggerWidth: true,
    syncListHeight: true,
    dropdownVisibleEvent: true
});

const SelectInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'select'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(MobileSelect);
};

SelectInner.Field = MobileSelect;
SelectInner.Option = Select.Option;
SelectInner.OptGroup = Select.OptGroup;

const _Select = withLocale(SelectInner);

export default _Select;
