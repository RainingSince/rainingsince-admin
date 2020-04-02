import { Alert } from 'antd';
import React, { useState } from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginFrom from './components/Login';
import styles from './style.less';

const { UserName, Password, Submit } = LoginFrom;

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {

  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;

  const [type] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom  onSubmit={handleSubmit}>

        <div>

          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}

          <UserName
            name="account"
            placeholder="用户名:"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />

          <Password
            name="password"
            placeholder="密码:"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />

        </div>

        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
