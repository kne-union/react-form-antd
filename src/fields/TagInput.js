import React, { useRef, useState, useEffect } from "react";
import { Input, Tag, Tooltip } from "antd";
import { hooks } from "@kne/react-form-helper";
import { PlusOutlined } from "@ant-design/icons";
import useControlValue from '@kne/use-control-value';

const { useOnChange } = hooks;

const _TagInput = ({ addText, max, inputProps, ...props }) => {
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
    setInputVisible(false);
    setInputValue("");
  };
  const handleShowInput = () => {
    setInputVisible(true);
  };
  useEffect(() => {
    if (inputVisible) {
      saveInputRef.current.focus();
    }
  }, [inputVisible])
  return (
    <div className="react-form-label_input">
      {(tags || []).map((tag, index) => {
        const isLongTag = tag.length > max;
        const tagElem = (
          <Tag
            className="react-form-edit-tag"
            key={tag}
            closable
            onClose={() => {
              const _tags = tags.filter(tag => tag !== _tag);
              setTags([..._tags]);
            }}
          >
            <span
              onDoubleClick={e => {
                if (index !== 0) {
                  this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                    this.editInput.focus();
                  });
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, max)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
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
        <Tag onClick={handleShowInput} className="react-form-label_input_plus">
          {addText}
        </Tag>
      )}
    </div>
  );
};

_TagInput.defaultProps = {
  max: 20,
  addText: <><PlusOutlined /> 添加标签</>
};

const TagInput = (props) => {
  const render = useOnChange(props);
  return render(_TagInput);
};

TagInput.field = _TagInput;

export default TagInput;