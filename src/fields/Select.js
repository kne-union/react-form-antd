import {Select} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withLocale, {useIntl} from '../withLocale';

const {useOnChange} = hooks;

const SelectInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'select'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(Select);
};

SelectInner.Field = Select;
SelectInner.Option = Select.Option;
SelectInner.OptGroup = Select.OptGroup;

const _Select = withLocale(SelectInner);

export default _Select;
