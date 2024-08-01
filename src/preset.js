import {preset as presetRules} from '@kne/react-form';
import merge from 'lodash/merge';
import {preset as formHelperPreset} from '@kne/react-form-helper';

export const globalParams = {
    type: 'default', size: 'middle', rules: {}, formModal: {}, resetButton: {}, submitButton: {}, field: {}
};

export default (props) => {
    const defaultProps = {};
    merge(globalParams, props);
    Object.keys(globalParams.field).forEach((name) => {
        defaultProps[name] = (globalParams.field[name] || {}).defaultProps;
    });
    formHelperPreset({
        field: defaultProps, globalProps: globalParams.globalProps
    });
    presetRules(globalParams.rules);
};
