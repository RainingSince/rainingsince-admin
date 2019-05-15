import React, { Component } from 'react';
import { Drawer } from 'antd';

class FormDrawer extends Component<{ title: string, width, visible, closeClick }> {

  static defaultProps = {
    width: 600,
  };

  render() {

    const { title, children, width } = this.props;

    return <Drawer
      title={title}
      width={width}
      destroyOnClose={true}
      visible={this.props.visible}
      onClose={this.props.closeClick}
    >
      {children}
    </Drawer>
      ;
  }
}


export default FormDrawer;
