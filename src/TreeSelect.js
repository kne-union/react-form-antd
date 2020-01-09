import {useOnChange} from './useDecorator';
import TreeSelect from 'antd/es/tree-select';

const _TreeSelect = (props) => {
    const render = useOnChange(props);
    return render(TreeSelect);
};

_TreeSelect.TreeNode = TreeSelect.TreeNode;

export default _TreeSelect;
