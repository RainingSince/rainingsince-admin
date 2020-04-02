import React from 'react';
import { Drawer } from 'antd';
import { FormPopupProps } from './entity'


const FormDrawer: React.FC<FormPopupProps> = (props) => {

  return <Drawer
    title={props.title}
    width={props.width ? props.width : 600}
    visible={props.visible}
    onClose={props.closeClick}
    destroyOnClose
  >
    {props.children}
  </Drawer>

}

export default FormDrawer;
