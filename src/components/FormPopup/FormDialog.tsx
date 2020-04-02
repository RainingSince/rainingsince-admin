import React from 'react';
import { Modal } from 'antd';
import { FormPopupProps } from './entity'

const FormPopup: React.FC<FormPopupProps> = (props) => {

    return <Modal
        title={props.title}
        className="rs-modal-form"
        width={props.width ? props.width : 800}
        visible={props.visible}
        onCancel={props.closeClick}
        footer={null}
        destroyOnClose
    >
        {props.children}
    </Modal>

}

export default FormPopup;