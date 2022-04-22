import {TreeSelect} from 'antd';
import {hooks} from '@kne/react-form-helper';
import getPopupContainer from "../common/getPopupContainer";
import withFetch from "../common/withFetch";

const {useOnChange} = hooks;

const _TreeSelect = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
    return render(TreeSelect);
};

_TreeSelect.Fetch = withFetch(TreeSelect);

_TreeSelect.defaultProps = _TreeSelect.Fetch.defaultProps = {
    getPopupContainer
};

_TreeSelect.TreeNode = TreeSelect.TreeNode;

export default _TreeSelect;
