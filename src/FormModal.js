import React from 'react';
import Modal from 'antd/es/modal';
import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';
import Space from 'antd/es/space';
import Form from "./Form";
import {withFetch} from '@kne/react-fetch';
import classnames from 'classnames';

const FetchForm = withFetch(Form);

export default ({className, formProps = {}, footer, children, ...props}) => {
    const TargetForm = formProps.hasOwnProperty('url') ? FetchForm : Form;
    return <Modal {...props} className={classnames(className, 'react-form-modal')} footer={null}>
        <TargetForm {...formProps}>
            <div className="ant-modal-body">
                {children}
            </div>
            <div className="ant-modal-footer">
                {footer ? footer : <Space>
                    <ResetButton>重置</ResetButton>
                    <SubmitButton type="primary">确定</SubmitButton>
                </Space>}
            </div>
        </TargetForm>
    </Modal>
};
