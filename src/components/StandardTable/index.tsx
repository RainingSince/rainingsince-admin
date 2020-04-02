import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import styles from './index.less';

function initTotalList(columns: any[]) {
  const totalList: any[] = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

export interface StandardTableProps {
  columns: any[];
  onSelectRow: (row: any) => void;
  data: any;
  rowKey: string;
  selectedRows: any[];
  onChange: (
    pagination: PaginationConfig,
    filters: Record<keyof any, string[]>,
    sorter: SorterResult<any>,
    extra?: TableCurrentDataSource<any>,
  ) => void;
  loading: boolean;
}

export interface StandardTableState {
  selectedRowKeys: [],
  needTotalList: any[]
}

export default class StandardTable extends PureComponent<StandardTableProps, StandardTableState> {

  static defaultProps = {
    columns: [],
    onSelectRow: undefined,
    data: null,
    rowKey: 'id',
    selectedRows: [],
    onChange: undefined,
    loading: false,
  };

  constructor(props: StandardTableProps) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps:any) {
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys:any, selectedRows:any) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum:any, val:any) => sum + parseFloat(val[item.dataIndex]), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination:any, filters:any, sorter:any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data = {}, rowKey, ...rest } = this.props;
    const { list = [], pagination } = data;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record:any) => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                  {item.title}
                    总计&nbsp;
                  <span style={{ fontWeight: 600 }}>
                    {item.render ? item.render(item.total) : item.total}
                  </span>
                </span>
              ))}
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          {...rest}
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
