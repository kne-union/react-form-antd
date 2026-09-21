import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import withMobileText from '../mobileText/withMobileText';

const {useDecorator} = hooks;

const MobileTextArea = withMobileText(Input.TextArea);

const TextAreaInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'textArea'
    }, props);
    const render = useDecorator(Object.assign({placeholder: formatMessage({id: 'PleaseInput'}, {label: mergedProps.label})}, mergedProps));
    return render(MobileTextArea);
};

TextAreaInner.Field = Input.TextArea;

const TextArea = withLocale(TextAreaInner);

export default TextArea;
