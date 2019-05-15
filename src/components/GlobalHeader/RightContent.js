import React, { PureComponent } from 'react';
import { Spin, Menu, Icon, Avatar } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { connect } from 'dva';

@connect()
export default class GlobalHeaderRight extends PureComponent {

  toLogout = () => {
    this.props.dispatch({
      type: 'login/logout',
    });
  };

  render() {
    const {
      name,
      onMenuClick,
      theme,
    } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>

        <Menu.Item key="logout">
          <Icon type="logout" onClick={e => this.toLogout()}/>
          退出登录
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {name ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                style={{ backgroundColor: '#87d068', color: '#FFF' }}
                alt="avatar"
              >
                {name.toString()[0]}
              </Avatar>
              <span className={styles.name}>{name}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }}/>
        )}
      </div>
    );
  }
}
