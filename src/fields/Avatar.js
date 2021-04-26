import React, {useState, useRef, useEffect} from 'react';
import {Upload, message, Modal, Slider, Row, Col, Space} from 'antd';
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



    const AvatarEditorBox = ({file})=>{
        const [rotate, setRotate] = useState(0);
        const [scale, setScale] = useState(1);

        const onChange = (v)=>{
            console.log(v);
            setRotate(v);
        }
        const onChangeScale = (v)=>{
            console.log(v);
            setScale(v);
        }
        return (
            <div style={{'marginLeft':'50px'}}>
                <AvatarEditor
                    ref={editorRef}
                    image={file}
                    width={editor.width}
                    height={editor.height}
                    border={1}
                    borderRadius={editor.borderRadius}
                    color={[24, 144, 255, 1]} // RGBA
                    scale={scale}
                    rotate={rotate}
                />
                <Row gutter={4}>
                    <Col span={4}><span>旋转</span></Col>
                    <Col span={15}>
                        <Slider tooltipVisible={false} defaultValue={rotate} min={-180} max={180} onChange={onChange} />
                    </Col>
                </Row>
                <Row gutter={4}>
                    <Col span={4}><span>放大</span></Col>
                    <Col span={15}>
                        <Slider tooltipVisible={false} defaultValue={scale} step={0.1} min={1} max={3} onChange={onChangeScale} />
                    </Col>
                </Row>
            </div>
        )
    }

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
                    content: <AvatarEditorBox file={file}/>,
                    okText: editor.text,
                    onOk: (close) => {
                        // console.log(editorRef.current);
                        let base64 = editorRef.current.getImage().toDataURL();
                        setImageUrl(base64);
                        let blob = dataURLtoBlob(base64);
                        const files = new window.File(
                            [blob],
                            file.name,
                            { type: file.type }
                        );
                        onBeforeUpload && onBeforeUpload(files);
                        resolve(files);
                        // console.log(files);
                        close();
                    }
                })
            } else {
                onBeforeUpload && onBeforeUpload(file);
                resolve(file);
                // return onBeforeUpload && onBeforeUpload(file);
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
