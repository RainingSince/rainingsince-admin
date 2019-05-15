import React from 'react';
import { Button, Form, Input } from 'antd';
import Authorized from '@/utils/Authorized';



// @ts-ignore
@Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        name: 'name',
        // @ts-ignore
        value: props.dataSource.name,
      }),
      remark: Form.createFormField({
        name: 'remark',
        // @ts-ignore
        value: props.dataSource.remark,
      }),
    };
  },
})
class RoleForm extends React.Component<{
  submitClick, cancelClick, dataSource, form, dispatch, detail
}, {}> {

  static defaultProps = {
    form: undefined,
    detail: { name: '', remark: '' },
    dispatch: undefined,
    dataSource: { name: '', remark: '' },
  };

  onSubmit = () => {
    this.props.form.validateFieldsAndScroll();
    let err = this.props.form.getFieldsError(['name']);
    if (!err.name)
      this.props.submitClick(this.props.dataSource.id ?
        'update' : 'add', Object.assign(this.props.dataSource, this.props.form.getFieldsValue()));
  };


  render() {

    const { getFieldDecorator } = this.props.form;

    return <div>

      <Form style={{ width: '300px' }}>

        <Form.Item label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter role name' }],
          })(<Input placeholder="请输入角色名称"/>)}
        </Form.Item>

        <Form.Item label="描述">
          {getFieldDecorator('remark')(<Input placeholder="请输入角色描述"/>)}
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

export default RoleForm;
