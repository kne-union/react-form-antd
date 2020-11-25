import {preset as presetRules} from '@kne/react-form';
import merge from 'lodash/merge';

export const globalParams = {
    rules: {},
    field: {
        upload: {
            transformResponse: (response) => {
                return {
                    code: response.code,
                    results: response.results,
                    msg: response.msg
                }
            },
            action: '/upload'
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