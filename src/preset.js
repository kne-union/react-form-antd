import {preset as presetRules} from '@kne/react-form';
import {merge, get} from 'lodash';
import {preset as formHelperPreset} from '@kne/react-form-helper';

export const globalParams = {
    type: 'default', size: 'middle', rules: {}, formModal: {}, resetButton: {}, submitButton: {}, field: {
        upload: {
            displayFilename: 'filename', action: '/upload', transformResponse: (response) => {
                const targetPath = get(response, 'results[0].targetPath');
                const filename = get(response, 'results[0].filename');
                return {
                    code: response.code,
                    msg: response.msg,
                    results: targetPath + (filename ? `?${globalParams.field.upload.displayFilename}=` + encodeURIComponent(filename) : '')
                };
            }
        }, avatar: {
            transformResponse: (response) => {
                return {
                    code: response.code, results: response.results, msg: response.msg
                }
            }, action: '/upload'
        }
    }
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
