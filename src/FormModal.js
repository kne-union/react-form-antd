import React, {forwardRef} from 'react';
import {Modal, Space} from 'antd';
import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';
import CancelButton from './CancelButton';
import Form from "./Form";
import {withFetch} from '@kne/react-fetch';
import classnames from 'classnames';

const FetchForm = withFetch(Form);

const CommonModal = forwardRef(({formProps, footer, close, onCancel, isReset, children}, ref) => {
    const TargetForm = formProps.hasOwnProperty('url') ? FetchForm : Form;
    return <TargetForm {...formProps} ref={ref}>
        <div className="ant-modal-body">
            {children}
        </div>
        <div className="ant-modal-footer">
            {footer ? footer : <Space>
                {isReset ? <ResetButton>重置</ResetButton> : <CancelButton onClick={() => {
                    onCancel && onCancel();
                }}>取消</CancelButton>}
                <SubmitButton type="primary">确定</SubmitButton>
            </Space>}
        </div>
    </TargetForm>;
});

const FormModal = forwardRef(({
                                  className,
                                  formProps = {},
                                  footer,
                                  children,
                                  isReset,
                                  ...props
                              }, ref) => {
    return <Modal {...props} className={classnames(className, 'react-form-modal')} footer={null}>
        <CommonModal ref={ref} formProps={formProps} footer={footer} isReset={isReset}
                     onCancel={props.onCancel}>{children}</CommonModal>
    </Modal>
});

FormModal.modal = ({className, title, formProps = {}, footer, content, isReset, ...props}) => Modal.info({
    ...props,
    title: title ? <div className="ant-modal-header">
        <div className="ant-modal-title">{title}</div>
    </div> : null,
    className: classnames(className, 'react-form-modal'),
    content: <CommonModal formProps={formProps} footer={footer} isReset={isReset}
                          onCancel={props.onCancel}>{content}</CommonModal>,
    icon: null,
    footer: null
});

export default FormModal;
