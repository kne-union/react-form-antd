import {Input} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withLocale, {useIntl} from '../withLocale';

const {useDecorator} = hooks;

const TextAreaInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'textArea'
    }, props);
    const render = useDecorator(Object.assign({placeholder: formatMessage({id: 'PleaseInput'}, {label: mergedProps.label})}, mergedProps));
    return render(Input.TextArea);
};

TextAreaInner.Field = Input.TextArea;

const TextArea = withLocale(TextAreaInner);

export default TextArea;
