import React, { RefObject, createRef } from 'react';
import { Button, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { SystemUserDetail } from '@/pages/system/models/users';


export interface UserFormProp {
  type?: string,
  submitClick: Function,
  cancelClick: () => void,
  dataSource: SystemUserDetail
}


class UserForm extends React.Component<UserFormProp, {}> {
  formRef: RefObject<FormInstance> = createRef<FormInstance>()

  onSubmit = () => {

    if (this.formRef.current == null) return
    this.formRef.current.validateFields().then(values => {
      this.props.submitClick(this.props.dataSource.id ?
        'update' : 'add', values);
    }).catch(err => {
      if (err.name) {
        if (this.formRef.current == null) return
        this.formRef.current.scrollToField("name")
        return
      }

      if (err.account) {
        if (this.formRef.current == null) return
        this.formRef.current.scrollToField("account")
        return
      }

      if (err.password) {
        if (this.formRef.current == null) return
        this.formRef.current.scrollToField("password")
      }

    });
  };


  render() {
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 }
    }
    return <div
      style={this.props.type === 'drawer' ? {} : {
        marginBottom: '50px'
      }}>

      <Form {...layout} ref={this.formRef}>

        <Form.Item label="名称" name="name"
          rules={[{ required: true, message: 'Please enter user name' }]}
        >
          <Input placeholder="请输入用户名称" />
        </Form.Item>


        <Form.Item label="手机号" name="phone"
        >
          <Input placeholder="请输入用户手机号" />
        </Form.Item>

        <Form.Item label="账户" name="account"
          rules={[{ required: true, message: 'Please enter user account' }]}
        >
          <Input placeholder="请输入用户账户" />
        </Form.Item>

        <Form.Item label="密码" name="password"
          rules={[{ required: true, message: 'Please enter user password' }]}
        >
          <Input.Password placeholder="请输入用户密码" />
        </Form.Item>

        <Form.Item label="描述" name="remark">
          <Input placeholder="请输入用户描述" />
        </Form.Item>

      </Form>

      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={this.props.cancelClick} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={this.onSubmit} type="primary">
          {this.props.dataSource.id ? '更新' : '创建'}
        </Button>
      </div>
    </div>;
  }
}

export default UserForm;
