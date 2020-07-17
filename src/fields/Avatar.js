import React, {useState, useRef, useEffect} from 'react';
import {Upload, message, Modal} from 'antd';
import {useOnChange} from '../hooks/useDecorator';
import {globalParams} from '../preset';
import classnames from 'classnames';
import {
    PlusOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import AvatarEditor from "react-avatar-editor";

const avatarParams = globalParams.field.avatar;


const _Avatar = ({className, value: imageUrl, onChange: propsChange, beforeUpload: onBeforeUpload, transformResponse, action, imageType, size, children, onError, editor}) => {
    const [loading, setLoading] = useState(false);
    const [showImageUrl, setImageUrl] = useState(imageUrl);
    const editorRef = useRef();

    useEffect(() => {
        setImageUrl(imageUrl)
    }, [imageUrl])

    /* base64转blob */
    const dataURLtoBlob = (dataurl) => {
        let arr = dataurl.split(',');
        // 注意base64的最后面中括号和引号是不转译的
        let _arr = arr[1].substring(0, arr[1].length - 2);
        let mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(_arr),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: mime
        });
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            {children}
        </div>
    );

    const beforeUpload = async (file) => {
        return new Promise((resolve, reject) => {

            console.log('文件', file);
            const isJpgOrPng = imageType.indexOf(file.type) > -1;
            if (!isJpgOrPng) {
                onError(`只支持${imageType.map((str) => str.replace('image/', '')).join('/')}格式图片!`, 'typeError', {
                    type: imageType,
                    fileType: file.type
                });
                reject();
                return false;
            }
            const isLt = file.size / 1024 / 1024 < size;
            if (!isLt) {
                onError(`图片不能超过${size}MB!`, 'sizeError', {size, fileSize: file.size});
                reject();
                return false;
            }

            /*剪切图像*/
            // editor:{open:false,width:250,height:250,borderRadius:0-100,text:'剪切'}
            if (editor.open) {
                Modal.success({
                    // title: '剪切图像',
                    icon: '',
                    content: <AvatarEditor
                        ref={editorRef}
                        image={file}
                        width={editor.width}
                        height={editor.height}
                        border={50}
                        borderRadius={editor.borderRadius}
                        color={[255, 255, 255, 0.9]} // RGBA
                        scale={1.2}
                        rotate={0}
                    />,
                    okText: editor.text,
                    onOk: (close) => {
                        console.log(editorRef.current);
                        let base64 = editorRef.current.getImage().toDataURL();
                        setImageUrl(base64);
                        let blob = dataURLtoBlob(base64);
                        // console.log(blob);
                        close();
                        resolve(onBeforeUpload && onBeforeUpload(blob))
                    }
                })
            } else {
                return onBeforeUpload && onBeforeUpload(file);
            }
        })

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
        <>
            <Upload className={classnames(className, 'react-form-avatar')} listType="picture-card"
                    showUploadList={false}
                    action={action || avatarParams.action}
                    beforeUpload={beforeUpload} onChange={onChange}>
                {showImageUrl ? <div className="preview"><img src={showImageUrl} alt="avatar"/></div> : uploadButton}
            </Upload>
        </>
    );
};

_Avatar.defaultProps = {
    imageType: ['image/jpeg', 'image/png'],
    size: 2, // 单位MB
    children: <div className="ant-upload-text">点击上传</div>,
    onError: (info) => message.error(info),
    editor: {open: false, width: 250, height: 250, borderRadius: 1, text: '剪切'}
};

const AvatarInput = (props) => {
    const render = useOnChange(props);
    return render(_Avatar);
};

AvatarInput.field = _Avatar;

export default AvatarInput;
