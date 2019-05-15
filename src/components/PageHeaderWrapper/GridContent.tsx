import React from 'react';
import { connect } from 'dva';

const styles = require('./GridContent.less');

export interface GridContentProps {
  contentWidth: string;
  children: React.ReactNode;
}

@connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))
export default class GridContent extends React.PureComponent<GridContentProps, any> {

  static defaultProps = {
    contentWidth: '',
  };

  render() {
    const { contentWidth, children } = this.props;
    let className = `${styles.main}`;
    if (contentWidth === 'Fixed') {
      className = `${styles.main} ${styles.wide}`;
    }
    return <div className={className}>{children}</div>;
  }
}
