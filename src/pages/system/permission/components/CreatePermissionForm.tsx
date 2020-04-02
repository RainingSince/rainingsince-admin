import React, { Component, RefObject, createRef } from 'react';
import { FormInstance } from 'antd/lib/form';
import { Button, Form, Input } from 'antd';
import { PermissionEntity } from '../entity';


export interface PermissionFormProps {
    submitClick: Function,
    cancelClick: Function,
    type?: string,
    dataSource: PermissionEntity,
}

class CreatePermissionForm extends Component<PermissionFormProps, {}> {

    formRef: RefObject<FormInstance> = createRef<FormInstance>()


    static defaultProps = {
        type: "drawer",
        dataSource: { name: '', code: '', remark: '' },
    };


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

            if (err.code) {
                if (this.formRef.current == null) return
                this.formRef.current.scrollToField("code")
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
            }}
        >

            <Form
                ref={this.formRef}
                {...layout}
                initialValues={
                    {
                        name: this.props.dataSource.name,
                        code: this.props.dataSource.code,
                        remark: this.props.dataSource.remark,
                    }
                }
            >
                <Form.Item label="名称" name="name" rules={
                    [{ required: true, message: 'Please enter user name' }]
                } >
                    <Input placeholder="请输入权限名称" />
                </Form.Item>

                <Form.Item label="路径" name="code" rules={
                    [{ required: true, message: 'Please enter user name' }]
                }><Input placeholder="请输入权限路径" />
                </Form.Item>

                <Form.Item label="描述" name="remark" >
                    <Input placeholder="请输入权限描述" />
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
                <Button onClick={() => this.props.cancelClick()} style={{ marginRight: 8 }}>
                    取消
                </Button>
                <Button onClick={this.onSubmit} type="primary">
                    {this.props.dataSource.id ? '更新' : '创建'}
                </Button>
            </div>
        </div>;
    }
}

export default CreatePermissionForm;
