import React, {useState} from 'react';
import {Upload, message} from 'antd';
import {useOnChange} from '@kne/react-form-antd';
import {globalParams} from '../preset';
import classnames from 'classnames';
import {
  PlusOutlined,
  LoadingOutlined
} from '@ant-design/icons';

const avatarParams = globalParams.field.avatar;


const _Avatar = ({className, value: imageUrl, onChange: propsChange, transformResponse, action, imageType, size, children, onError}) => {
  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      {children}
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = imageType.indexOf(file.type) > -1;
    if (!isJpgOrPng) {
      onError(`只支持${imageType.map((str) => str.replace('image/', '')).join('/')}格式图片!`, 'typeError', {
        type: imageType,
        fileType: file.type
      });
    }
    const isLt = file.size / 1024 / 1024 < size;
    if (!isLt) {
      onError(`图片不能超过${size}MB!`, 'sizeError', {size, fileSize: file.size});
    }
    return isJpgOrPng && isLt;
  };

  const onChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const response = (transformResponse || avatarParams.transformResponse)(info.file.response);
      if (response.code === 200) {
        propsChange(response.results);
      } else {
        onError(response.msg, 'xhrError', response);
      }
    }
  };

  return (
    <Upload className={classnames(className, 'react-form-avatar')} listType="picture-card" showUploadList={false}
            action={action || avatarParams.action}
            beforeUpload={beforeUpload} onChange={onChange}>
      {imageUrl ? <div className="preview"><img src={imageUrl} alt="avatar"/></div> : uploadButton}
    </Upload>
  );
};

_Avatar.defaultProps = {
  imageType: ['image/jpeg', 'image/png'],
  size: 2,//单位MB
  children: <div className="ant-upload-text">点击上传</div>,
  onError: (info) => message.error(info)
};

export default (props) => {
  const render = useOnChange(props);
  return render(_Avatar);
};