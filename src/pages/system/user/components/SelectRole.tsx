import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Button, Row, Transfer } from 'antd';
import { ConnectState } from '@/models/connect';
import { SystemUserDetail } from '@/pages/system/models/users';
import { TransferItem } from 'antd/lib/transfer';


export interface SelectRoleProps {
  roleList: [],
  roles: [],
  userDetail: SystemUserDetail,
  dispatch: any,
  dataSource: SystemUserDetail,
  submitClick: Function,
  cancelClick: () => void
}

export interface SelectRoleState {
  selectedKeys: string[],
  targetKeys: string[],
}


class SelectRole extends PureComponent<SelectRoleProps, SelectRoleState> {

  constructor(props: SelectRoleProps) {
    super(props);
    this.state = {
      selectedKeys: [],
      targetKeys: [],
    };
  }



  componentDidMount() {
    this.props.dispatch({
      type: 'users/userDetail',
      payload: this.props.dataSource,
    });
    this.props.dispatch({
      type: 'roles/loadAllRole',
    });
  }

  componentWillReceiveProps(nextProps: SelectRoleProps) {
    this.setState({
      selectedKeys: nextProps.roleList,
      targetKeys: nextProps.roleList,
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
    return <span> {item.name}</span>;
  };

  render() {

    const { roles } = this.props;
    const { selectedKeys, targetKeys } = this.state;


    return <Row justify="center">
      <Transfer
        rowKey={(record: TransferItem) => record.id}
        dataSource={roles}
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
        titles={['未选择角色', '已选择角色']}
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
          this.props.submitClick(this.props.userDetail.id, this.state.targetKeys);
        }}
          type="primary">
          保存
        </Button>
      </div>
    </Row>;
  }

}

export default connect(({ users, roles }: ConnectState) => ({
  userDetail: users.detail,
  roleList: users.detail.roleList,
  roles: roles.allRoles,
}))(SelectRole);
