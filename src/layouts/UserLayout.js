import React from 'react';
import styles from './UserLayout.less';

class UserLayout extends React.PureComponent {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default UserLayout;
