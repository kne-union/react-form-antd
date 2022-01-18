import {preset as presetRules} from '@kne/react-form';
import merge from 'lodash/merge';
import get from "lodash/get";

export const globalParams = {
    rules: {},
    field: {
        upload: {
            action: '/open-api/upload_static_file/interview-manager',
            transformResponse: (response) => {
                const targetPath = get(response, 'results[0].targetPath');
                const filename = get(response, 'results[0].filename');
                return {
                    code: response.code,
                    msg: response.msg,
                    results: targetPath + (filename ? '?filename=' + encodeURIComponent(filename) : '')
                };
            }
        },
        avatar: {
            transformResponse: (response) => {
                return {
                    code: response.code,
                    results: response.results,
                    msg: response.msg
                }
            },
            action: '/upload'
        }
    }
};

export default (props) => {
    merge(globalParams, props);
    presetRules(globalParams.rules);
};
