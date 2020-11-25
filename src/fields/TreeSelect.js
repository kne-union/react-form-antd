import TreeSelect from 'antd/es/tree-select';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const _TreeSelect = (props) => {
    const render = useOnChange(props);
    return render(TreeSelect);
};

_TreeSelect.TreeNode = TreeSelect.TreeNode;

export default _TreeSelect;
