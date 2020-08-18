import React, {useState, useRef, useEffect} from 'react';
import {useOnChange} from '../hooks/useDecorator';
import { Editor } from '@tinymce/tinymce-react';
import _uniqueId from 'lodash/uniqueId';

const _Editor = ({init, value: editorValue, onChange: propsChange, plugins, toolbar, ...props}) => {
  const tinymceId = `editor-tinymce-${props.id}-${_uniqueId()}-${new Date().getTime()}`;
  const [editor, setEditor] = useState(editorValue);
  const editorRef = useRef();
  const onEditorChange = (content, editor) => {
    setEditor(content);
    propsChange && propsChange(content, editor);
  }
  useEffect(() => {
    setEditor(editorValue);
  }, [editorValue])
  return (
    <>
      <Editor
        ref={editorRef}
        id={tinymceId}
        {...props}
        value={editor}
        tinymceScriptSrc={'https://static.knxgalaxy.com/upload_assets/tinymce/tinymce.min.js'}
        init={init}
        plugins={plugins}
        toolbar={toolbar}
        onEditorChange={onEditorChange}
      />
    </>
  )
}

_Editor.defaultProps = {
  init: {
    language: 'zh_CN',
    height: 350,
    menubar: true
  },
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar:
    'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help'
};

const EditorInput = (props) => {
  const render = useOnChange(props);
  return render(_Editor);
}

EditorInput.field = _Editor;

export default EditorInput;