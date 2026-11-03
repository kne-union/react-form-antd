import {InputNumber} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import withMobileStepper from '../mobileStepper/withMobileStepper';

const {useDecorator} = hooks;

const MobileInputNumber = withMobileStepper(InputNumber);

const InputNumberFieldInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'inputNumber', autoComplete: 'off'
    }, props);
    const render = useDecorator(Object.assign({placeholder: formatMessage({id: 'PleaseInput'}, {label: mergedProps.label})}, mergedProps));
    return render(MobileInputNumber);
};

InputNumberFieldInner.Field = InputNumber;

const InputNumberField = withLocale(InputNumberFieldInner);

export default InputNumberField;
