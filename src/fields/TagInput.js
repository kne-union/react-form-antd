import React, { useRef, useState, useEffect } from "react";
import { Input, Tag, Tooltip } from "antd";
import { hooks } from "@kne/react-form-helper";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import useControlValue from '@kne/use-control-value';

const { useOnChange } = hooks;

const _TagInput = ({ addText, max, inputProps, closable, closeIcon, onClose, hoverClose = false, tagRender, tooltipProps, showAddInput, addInputPosition, ...props }) => {
  const saveInputRef = useRef();
  const [tags, setTags] = useControlValue(props);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputConfirm = () => {
    const _tags = tags || [];
    if (inputValue && _tags.indexOf(inputValue) === -1) {
      _tags.push(inputValue);
    }
    setTags([..._tags]);
    showAddInput && setInputVisible(false);
    setInputValue("");
  };
  const handleShowInput = () => {
    setInputVisible(true);
  };

  const addInputTagRender = <>
    {inputVisible && (
      <Input
        type="text"
        size="small"
        {...inputProps}
        className="react-form-edit-input"
        ref={saveInputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    )}
    {!inputVisible && (
      <Tag onClick={handleShowInput} className="react-form-edit-tag react-form-label_input_plus">
        {addText}
      </Tag>
    )}
  </>;

  useEffect(() => {
    if (showAddInput && inputVisible) {
      saveInputRef.current && saveInputRef.current.focus();
    }
  }, [showAddInput, inputVisible])
  return (
    <div className="react-form-label_input">
      {addInputPosition === 'left' && showAddInput && addInputTagRender}
      {(tags || []).map((tag) => {
        const isLongTag = tag.length > max;
        const tagElem = (
          <Tag
            className="react-form-edit-tag"
            key={tag}
            closable={false}
          >
            {tagRender ? tagRender(tag) : <>
              <span>
                {isLongTag ? `${tag.slice(0, max)}...` : tag}
              </span>
              {closable && <span className={`react-form-edit-tag-close-icon ${hoverClose ? 'hover-tag-close-icon' : ''}`} onClick={() => {
                const _tags = tags.filter(x => x !== tag);
                setTags([..._tags]);
                onClose(tag, _tags);
              }}>
                {closeIcon}
              </span>}
            </>}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} {...tooltipProps} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {addInputPosition === 'right' && showAddInput && addInputTagRender}
    </div>
  );
};

_TagInput.defaultProps = {
  max: 20,
  addText: <><PlusOutlined /> 标签</>,
  closeIcon: <CloseOutlined />,
  addInputPosition: 'left',
  showAddInput: true,
  closable: true,
  hoverClose: true,
  onClose: (tag, tags) => { }
};

const TagInput = (props) => {
  const render = useOnChange(props);
  return render(_TagInput);
};

TagInput.field = _TagInput;

export default TagInput;