import React, {useState, useEffect, useRef} from 'react';
import {Upload, message, Button} from 'antd';
import {
    UploadOutlined
} from '@ant-design/icons';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import {hooks} from '@kne/react-form-helper';
import {globalParams} from "../preset";

const {useOnChange} = hooks;

const {Dragger} = Upload;

const uploadParams = globalParams.field.upload;

const valueToList = (value) => {
    if (!value) {
        return [];
    }
    return value.map((item) => ({
        uid: uniqueId(),
        name: item.substr(item.lastIndexOf('/') + 1),
        status: 'done',
        response: {code: 200, results: item}
    }));
};

const listToValue = (value) => {
    return value.slice(0).filter(({status}) => status === 'done').map(({response}) => response.results);
};

const withValueAdapter = (WrappedComponent) => ({value, onChange, ...props}) => {
    const [list, setList] = useState([]);

    const targetListRef = useRef([]);

    useEffect(() => {
        if (isEqual(value, targetListRef.current)) {
            return;
        }
        setList(valueToList(value));
    }, [value]);

    return <WrappedComponent {...props} value={list} onChange={(value) => {
        value = value.map((item) => Object.assign({}, item));
        setList(value);
        const targetList = listToValue(value);
        targetListRef.current = targetList;
        if (isEqual(targetList, value)) {
            return;
        }
        onChange(targetList);
    }}/>;
};

const _Upload = ({className, value: list, onChange: setList, onUploadComplete, beforeUpload: onBeforeUpload, maxLength, drag, transformResponse, action, accept, fileSize: size, children, onError, ...props}) => {
    const beforeUpload = (file) => {
        if (maxLength === 1) {
            setList([]);
        }
        /*const typeAllowed = accept.length === 0 || !!accept.find((type) => type === file.type);
        if (!typeAllowed) {
            onError(`只支持${accept.join('/')}格式文件!`, 'typeError', {
                type: accept,
                fileType: file.type
            });
            return false;
        }*/
        const isLt = file.size / 1024 / 1024 < size;
        if (!isLt) {
            onError(`文件不能超过${size}MB!`, 'sizeError', {size, fileSize: file.size});
            return false;
        }

        return onBeforeUpload && onBeforeUpload(file);
    };

    const onChange = (info) => {
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
                info.file.name = info.file.response.results.substr(info.file.response.results.lastIndexOf('/') + 1);
                onUploadComplete(info.file);
            } else {
                info.file.status = 'error';
                onError(info.file.response.msg, 'xhrError', info.file.response);
            }
        }
        const newList = list.slice(0);
        const index = newList.findIndex(({uid}) => uid === info.file.uid);
        index > -1 && newList.splice(index, 1);
        if (info.file.status !== 'removed') {
            newList.push(info.file);
        }
        setList(newList);
    };

    const UploadComponent = drag ? Dragger : Upload;

    return (
        <UploadComponent {...props} action={action || uploadParams.action} fileList={list} accept={accept.join(',')}
                         onChange={onChange}
                         beforeUpload={beforeUpload}
        >
            {children}
        </UploadComponent>
    );
};

_Upload.defaultProps = {
    value: [],
    accept: [],
    fileSize: 2,
    maxLength: 1,
    children: <Button><UploadOutlined/>点击上传</Button>,
    onError: (info) => message.error(info),
    onUploadComplete: () => {
    }
};

const AdapterUpload = withValueAdapter(_Upload);

const UploadInput = (props) => {
    const render = useOnChange(props);
    return render(AdapterUpload);
};

UploadInput.field = _Upload;

export default UploadInput;
