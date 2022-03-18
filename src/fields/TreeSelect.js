import {TreeSelect} from 'antd';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const _TreeSelect = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props));
    return render(TreeSelect);
};

_TreeSelect.TreeNode = TreeSelect.TreeNode;

export default _TreeSelect;
