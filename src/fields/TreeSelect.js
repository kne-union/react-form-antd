import {TreeSelect} from 'antd';
import {hooks} from '@kne/react-form-helper';
import withLocale, {useIntl} from '../withLocale';

const {useOnChange} = hooks;

const TreeSelectInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'treeSelect'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(TreeSelect);
};

TreeSelectInner.Field = TreeSelect;
TreeSelectInner.TreeNode = TreeSelect.TreeNode;

const _TreeSelect = withLocale(TreeSelectInner);

export default _TreeSelect;
