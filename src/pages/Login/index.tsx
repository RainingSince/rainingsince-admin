import React, { Component } from 'react';
import { connect } from 'dva';
import './index.less';
import {
  Form, Input, Icon, Button, Col, Row,
} from 'antd';


// @ts-ignore
@Form.create()
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component<{ dispatch, login, submitting, form }, {}> {

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/login',
          playload: values,
        });
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;

    return <div>

      <Row type="flex" justify="center" align="middle" style={{ height: '100px', fontSize: '36px' }}>
        Mall Admin
      </Row>

      <Row type="flex" justify="center" align="middle">
        <Col span={6}>
          <Form className="login-form">
            <Form.Item>
              {
                getFieldDecorator('account', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                          placeholder="Username"/>)
              }

            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                          placeholder="Password"/>)
              }

            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleSubmit} style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>;
  }
}

export default LoginPage;
