import React, { Component } from 'react';
import Link from 'umi/link';
import { PageHeader, Typography } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import GridContent from './GridContent';
import MenuContext from '@/layouts/MenuContext';
import { conversionBreadcrumbList } from './breadcrumb';

const styles = require('./index.less');
const { Title } = Typography;

export interface ResultProps {
  className?: string;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  type: 'success' | 'error';
  contentWidth,
  restProps,
  hiddenBreadcrumb,
  logo,
  content,
  top
  extraContent,
}

@connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))
class PageHeaderWrapper extends Component<ResultProps, {}> {


  render() {

    const {
      contentWidth, restProps
      , hiddenBreadcrumb, logo, content,
      extraContent, children, title, top,
    } = this.props;

    return <div style={{ margin: '-24px -24px 0' }} className={classNames(classNames, styles.main)}>
      {top}
      <MenuContext.Consumer>
        {value => {
          return <PageHeader
            wide={contentWidth === 'Fixed'}
            title={
              <Title
                level={4}
                style={{
                  marginBottom: 0,
                }}
              >
                {title}
              </Title>
            }
            key="pageheader"
            {...restProps}
            breadcrumb={
              !hiddenBreadcrumb &&
              conversionBreadcrumbList({
                ...value,
                ...restProps,
                home: '首页',
              })
            }
            className={styles.pageHeader}
            linkElement={Link}
          >
            <div className={styles.detail}>
              {logo && <div className={styles.logo}>{logo}</div>}
              <div className={styles.main}>
                <div className={styles.row}>
                  {content && <div className={styles.content}>{content}</div>}
                  {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                </div>
              </div>
            </div>
          </PageHeader>;
        }}
      </MenuContext.Consumer>
      {children ? (
        <div className={styles['children-content']}>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>;
  }

}

export default PageHeaderWrapper;
