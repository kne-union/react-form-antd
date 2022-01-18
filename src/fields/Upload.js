import React, {useState, useMemo} from 'react';
import {Upload, message, Button} from 'antd';
import {
    UploadOutlined
} from '@ant-design/icons';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import uniqueId from 'lodash/uniqueId';
import {hooks} from '@kne/react-form-helper';
import {globalParams} from "../preset";

const {useOnChange} = hooks;

const {Dragger} = Upload;

const uploadParams = globalParams.field.upload;

const computedFilename = (path, displayFilename = 'filename') => {
    const strArray = path.split('?');
    if (strArray[1]) {
        const query = {};
        strArray[1].split('&').forEach((str) => {
            const [key, value] = str.split('=');
            query[key] = value;
        });
        if (query[displayFilename]) {
            return decodeURIComponent(query[displayFilename]);
        }
    }
    return path;
};

const valueToList = (value, displayFilename) => {
    if (!value) {
        return [];
    }
    return value.map((item) => {
        return {
            uid: uniqueId(),
            name: computedFilename(item.substr(item.lastIndexOf('/') + 1), displayFilename),
            status: 'done',
            response: {code: 200, results: item}
        }
    });
};

const listToValue = (value) => {
    return (value || []).slice(0).filter(({status}) => status === 'done').map(({response}) => response.results);
};

const _Upload = ({action, value, onChange, drag, children, displayFilename, accept, fileSize: size, onError, onUploadComplete, onBeforeUpload, maxLength, transformResponse, ...props}) => {
    const [list, setList] = useState([]);
    const valueList = useMemo(() => {
        return valueToList(value.filter((url) => {
            return !list.find((file) => get(file, 'response.results') === url);
        })).concat(list);
    }, [list, value, displayFilename]);
    const changeHandler = (info) => {
        if (['uploading', 'done', 'error', 'removed'].indexOf(info.file.status) === -1) {
            return;
        }
        if (info.fileList.length > maxLength) {
            onError(`上传文件不能超过最大允许数量${maxLength}`, 'xhrError', maxLength);
            return;
        }
        if (info.file.status === 'done') {
            info.file.response = (transformResponse || uploadParams.transformResponse)(info.file.response);
            if (info.file.response.code === 200) {
                info.file.name = computedFilename(info.file.response.results.substr(info.file.response.results.lastIndexOf('/') + 1), displayFilename);
                onUploadComplete(info);
            } else {
                info.file.status = 'error';
                onError(info.file.response.msg, 'xhrError', info.file.response);
            }
        }
        const {done} = groupBy(info.fileList, (file) => file.status === 'done' ? 'done' : 'uploading');
        if (['done', 'removed'].indexOf(info.file.status) > -1) {
            onChange(listToValue(done));
        }
        setList(info.fileList);
    };
    const beforeUploadHandler = (file) => {
        const isLt = file.size / 1024 / 1024 < size;
        if (!isLt) {
            onError(`文件不能超过${size}MB!`, 'sizeError', {size, fileSize: file.size});
            return false;
        }
        if (maxLength === 1) {
            onChange([]);
            setList([]);
        }
        return onBeforeUpload && onBeforeUpload(file);
    };
    const UploadComponent = drag ? Dragger : Upload;
    return <UploadComponent {...props} action={action || uploadParams.action} fileList={valueList}
                            accept={accept.join(',')} onChange={changeHandler} beforeUpload={beforeUploadHandler}>
        {children}
    </UploadComponent>
};

_Upload.defaultProps = {
    value: [],
    accept: [],
    fileSize: 2,
    maxLength: 1,
    displayFilename: 'filename',
    children: <Button><UploadOutlined/>点击上传</Button>,
    onError: (info) => message.error(info),
    onUploadComplete: () => {
    }
};

const UploadInput = (props) => {
    const render = useOnChange(props);
    return render(_Upload);
};


UploadInput.field = _Upload;

export default UploadInput;
