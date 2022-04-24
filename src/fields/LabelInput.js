import React, { useRef, useState } from "react";
import { Input, Tag, Tooltip } from "antd";
import { hooks } from "@kne/react-form-helper";
import { PlusOutlined } from "@ant-design/icons";
import callbackState from "@kne/use-callback-state";

const { useOnChange } = hooks;

const defaultLabelProps = { value: "value", label: "label" };

const _LabelInput = ({ defaultValue, addText, max, inputProps, onChange }) => {
  const saveInputRef = useRef();
  const [tags, setTags] = useState(defaultValue);
  const [inputVisible, setInputVisible] = callbackState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags.push(inputValue);
    }
    setTags([...tags]);
    setInputVisible(false);
    setInputValue("");
    onChange(tags);
  };
  const handleShowInput = () => {
    setInputVisible(true, (state) => {
      saveInputRef.current.focus();
    });
  };
  return (
    <div className="react-form-label_input">
      {tags.map((tag, index) => {
        const isLongTag = tag.length > max;
        const tagElem = (
          <Tag
            className="react-form-edit-tag"
            key={tag}
            closable
            onClose={() => {
              const _tags = tags.filter(tag => tag !== _tag);
              setTags([..._tags]);
              onChange(_tags);
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

_LabelInput.defaultProps = {
  value: [],
  max: 20,
  addText: <><PlusOutlined /> 添加标签</>
};

const LabelInput = (props) => {
  const render = useOnChange(props);
  return render(_LabelInput);
};

LabelInput.field = _LabelInput;

export default LabelInput;