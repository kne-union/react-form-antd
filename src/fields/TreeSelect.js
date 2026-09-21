import {TreeSelect} from 'antd';
import {hooks} from '@kne/react-form-helper';
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';
import withMobilePopup from '../mobilePopup/withMobilePopup';

const {useOnChange} = hooks;

const MobileTreeSelect = withMobilePopup(TreeSelect, {
    kind: 'select',
    unlockTriggerWidth: true,
    syncListHeight: true
});

const TreeSelectInner = (props) => {
    const {formatMessage} = useIntl();
    const mergedProps = Object.assign({}, {
        fieldName: 'treeSelect'
    }, props);
    const render = useOnChange(Object.assign({placeholder: formatMessage({id: 'PleaseSelect'}, {label: mergedProps.label || ''})}, mergedProps));
    return render(MobileTreeSelect);
};

TreeSelectInner.Field = MobileTreeSelect;
TreeSelectInner.TreeNode = TreeSelect.TreeNode;

const _TreeSelect = withLocale(TreeSelectInner);

export default _TreeSelect;
