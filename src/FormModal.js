import React from 'react';
import {Modal, Space} from 'antd';
import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';
import Form from "./Form";
import {withFetch} from '@kne/react-fetch';
import classnames from 'classnames';

const FetchForm = withFetch(Form);

const CommonModal = ({formProps, footer, children}) => {
    const TargetForm = formProps.hasOwnProperty('url') ? FetchForm : Form;
    return <TargetForm {...formProps}>
        <div className="ant-modal-body">
            {children}
        </div>
        <div className="ant-modal-footer">
            {footer ? footer : <Space>
                <ResetButton>重置</ResetButton>
                <SubmitButton type="primary">确定</SubmitButton>
            </Space>}
        </div>
    </TargetForm>;
};

const FormModal = ({className, formProps = {}, footer, children, ...props}) => {
    return <Modal {...props} className={classnames(className, 'react-form-modal')} footer={null}>
        <CommonModal formProps={formProps} footer={footer}>{children}</CommonModal>
    </Modal>
};

FormModal.modal = ({className, title, formProps = {}, footer, content, ...props}) => Modal.info({
    ...props,
    title: title ? <div className="ant-modal-header">
        <div className="ant-modal-title">{title}</div>
    </div> : null,
    className: classnames(className, 'react-form-modal'),
    content: <CommonModal formProps={formProps} footer={footer}>{content}</CommonModal>,
    icon: null,
    footer: null
});

export default FormModal;
