import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Button, Row, Transfer } from 'antd';
import { TransferItem } from 'antd/lib/transfer';
import { ConnectState } from '@/models/connect';
import { RoleDetail } from '@/pages/system/models/roles';

export interface SelectPermissionProps {
  permissionList: [],
  permissions: [],
  roleDetail: RoleDetail,
  dispatch?: any,
  dataSource?: any,
  submitClick: Function,
  cancelClick?: () => void
}

export interface SelectPermissionState {
  selectedKeys: string[],
  targetKeys: string[]
}


class SelectPermission extends PureComponent<SelectPermissionProps, SelectPermissionState> {

  constructor(props: SelectPermissionProps) {
    super(props);
    this.state = {
      selectedKeys: [],
      targetKeys: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'roles/roleDetail',
      payload: this.props.dataSource,
    });
    this.props.dispatch({
      type: 'permissions/loadAllPermission',
    });
  }

  componentWillReceiveProps(nextProps: SelectPermissionProps) {
    this.setState({
      selectedKeys: nextProps.permissionList ? nextProps.permissionList : [],
      targetKeys: nextProps.permissionList ? nextProps.permissionList : [],
    });
  }

  handlerChange = (targetKeys: string[]) => {
    this.setState({ targetKeys });
  };

  handlerSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    });
  };


  renderItem = (item: any) => {
    return <span> {item.name} - {item.code} </span>;
  };

  render() {

    const { permissions } = this.props;
    const { selectedKeys, targetKeys } = this.state;


    return <Row justify="center">
      <Transfer
        rowKey={(record: TransferItem) => record.id}
        dataSource={permissions}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={this.handlerChange}
        onSelectChange={this.handlerSelectChange}
        render={this.renderItem}
        listStyle={{
          width: '20vw',
          height: '80vh',
          minHeight: '80vh',
        }}
        titles={['未选择权限', '已选择权限']}
      />

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
        <Button onClick={() => {
          this.props.submitClick(this.props.roleDetail.id, this.state.targetKeys);
        }}
          type="primary">
          保存
        </Button>
      </div>
    </Row>;
  }
}

export default connect(({ roles, permissions }: ConnectState) => ({
  roleDetail: roles.detail,
  permissionList: roles.detail.permissionList,
  permissions: permissions.allPermissions
}))(SelectPermission);
