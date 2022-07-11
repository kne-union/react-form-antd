import {
    preset
} from '@kne/react-form-antd';

preset({
    field: {
        upload: {
            displayFilename: 'attname'
        },
        datePicker: {
            defaultProps: {
                format: 'YYYY-MM-DD HH:mm'
            }
        }
    }
});
