import React, {useState, useRef, useEffect} from "react";
import {Upload, message, Modal, Slider, Row, Col, Space} from "antd";
import {globalParams} from "../preset";
import classnames from "classnames";
import {
    PlusOutlined, LoadingOutlined
} from "@ant-design/icons";
import AvatarEditor from "react-avatar-editor";
import {hooks} from "@kne/react-form-helper";
import merge from 'lodash/merge';
import omit from 'lodash/omit';

const {useOnChange} = hooks;
const avatarParams = globalParams.field.avatar;


const _Avatar = ({
                     className,
                     value: imageUrl,
                     onChange: propsChange,
                     beforeUpload: onBeforeUpload,
                     transformResponse,
                     action,
                     imageType,
                     fileSize: size,
                     children,
                     extraRender,
                     onError,
                     openEditor,
                     editor: targetEditor,
                     previewImg,
                     previewRender
                 }) => {
    const [loading, setLoading] = useState(false);
    const [showImageUrl, setImageUrl] = useState(imageUrl);
    const editorRef = useRef();

    const defaultEditor = {
        open: false,
        width: 250,
        height: 250,
        borderRadius: 1,
        text: "确定",
        cancelText: '取消',
        title: "裁剪图片"
    };
    const editor = merge({}, defaultEditor, {open: openEditor}, targetEditor);

    useEffect(() => {
        setImageUrl(imageUrl);
    }, [imageUrl]);

    /* base64转blob */
    const dataURLtoBlob = (dataurl) => {
        let arr = dataurl.split(",");
        // 注意base64的最后面中括号和引号是不转译的
        let _arr = arr[1].substring(0, arr[1].length - 2);
        let mime = arr[0].match(/:(.*?);/)[1], bstr = atob(_arr), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: mime
        });
    };


    const AvatarEditorBox = ({file}) => {
        const [rotate, setRotate] = useState(0);
        const [scale, setScale] = useState(() => {
            if (editor.width === editor.height) {
                return 1;
            }
            return 0.35;
        });

        const onChange = (v) => {
            setRotate(v);
        };
        const onChangeScale = (v) => {
            setScale(v);
        };
        return (<div style={{
            "width": editor.width, "margin": "auto"
        }}>
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
                    <Slider tooltipVisible={false} defaultValue={rotate} min={-180} max={180} onChange={onChange}/>
                </Col>
            </Row>
            <Row gutter={4}>
                <Col span={4}><span>放大</span></Col>
                <Col span={15}>
                    <Slider tooltipVisible={false} defaultValue={scale} step={0.05} min={0.2} max={3}
                            onChange={onChangeScale}/>
                </Col>
            </Row>
        </div>);
    };

    const uploadButton = (<div>
        {loading ? <LoadingOutlined/> : <PlusOutlined/>}
        {children}
    </div>);

    const beforeUpload = async (file) => {
        return new Promise((resolve, reject) => {
            const isJpgOrPng = imageType.indexOf(file.type) > -1;
            if (!isJpgOrPng) {
                onError(`只支持${imageType.map((str) => str.replace("image/", "")).join("/")}格式图片!`, "typeError", {
                    type: imageType, fileType: file.type
                });
                reject();
                return false;
            }
            const isLt = file.size / 1024 / 1024 < size;
            if (!isLt) {
                onError(`图片不能超过${size}MB!`, "sizeError", {size, fileSize: file.size});
                reject();
                return false;
            }

            /*剪切图像*/
            // editor:{open:false,width:250,height:250,borderRadius:0-100,text:'剪切'}
            if (editor.open) {
                Modal.confirm({
                    title: editor.title,
                    icon: "",
                    width: editor.width * 2,
                    content: <AvatarEditorBox file={file}/>,
                    cancelText: editor.cancelText,
                    okText: editor.text,
                    onOk: (close) => {
                        let base64 = editorRef.current.getImage().toDataURL();
                        setImageUrl(base64);
                        let blob = dataURLtoBlob(base64);
                        const files = new window.File([blob], file.name, {type: file.type});
                        onBeforeUpload && onBeforeUpload(files);
                        resolve(files);
                        close();
                    }
                });
            } else {
                onBeforeUpload && onBeforeUpload(file);
                resolve(file);
            }
        });

    };

    const onChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            setLoading(false);
            const response = (transformResponse || avatarParams.transformResponse)(info.file.response);
            if (response.code === 200) {
                propsChange(response.results);
            } else {
                onError(response.msg, "xhrError", response);
            }
        }
    };

    const headers = Object.assign({}, avatarParams.headers);

    if (typeof avatarParams.getHeaders === 'function') {
        Object.assign(headers, avatarParams.getHeaders())
    }

    return (<>
        <Upload {...omit(avatarParams, ['action', 'transformResponse', 'headers', 'getHeaders'])}
                headers={headers}
                className={classnames(className, "react-form-avatar")} listType="picture-card"
                showUploadList={false}
                action={action || avatarParams.action}
                beforeUpload={beforeUpload} onChange={onChange}>
            <div className="react-form-avatar-inner">
                {previewImg && showImageUrl ? previewRender ? previewRender(showImageUrl) :
                    <div className="preview"><img src={showImageUrl} alt="avatar"/></div> : uploadButton}
                {extraRender ? extraRender(showImageUrl) : ''}
            </div>
        </Upload>
    </>);
};

_Avatar.defaultProps = {
    imageType: ["image/jpeg", "image/png"],
    fileSize: 2, // 单位MB
    children: <div className="ant-upload-text">点击上传</div>,
    extraRender: null,
    onError: (info) => message.error(info),
    previewImg: true,
    previewRender: null,
    openEditor: false
};

const AvatarInput = (props) => {
    const render = useOnChange(props);
    return render(_Avatar);
};

AvatarInput.defaultProps = {
    fieldName: 'avatar'
};

AvatarInput.field = _Avatar;

export default AvatarInput;
