import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Row, Transfer } from 'antd';
import { TransferItem } from 'antd/lib/transfer';

interface Role extends TransferItem {
  id: string
}

@connect(({ users, roles }) => ({
  userDetail: users.detail,
  roleList: users.detail.roleList,
  roles: roles.roles,
}))
class SelectRole extends PureComponent<{
  roleList, roles, userDetail, dispatch, dataSource, submitClick, cancelClick,
}, { selectedKeys, targetKeys }> {

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      targetKeys: [],
    };
  }

  static defaultProps = {
    roleList: [],
    roles: [],
    dispatch: null,
    userDetail: {},
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'users/userDetail',
      playload: this.props.dataSource,
    });
    this.props.dispatch({
      type: 'roles/loadAllRole',
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedKeys: nextProps.roleList,
      targetKeys: nextProps.roleList,
    });
  }

  handlerChange = (targetKeys) => {
    this.setState({ targetKeys: targetKeys });
  };

  handlerSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    });
  };


  renderItem = (item) => {
    return <span> {item.name}</span>;
  };

  render() {

    const { roles } = this.props;
    const { selectedKeys, targetKeys } = this.state;


    return <Row type="flex" justify="center">
      <Transfer
        rowKey={(record: Role) => record.id}
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
      >

      </Transfer>


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
        <Button onClick={e => {
          this.props.submitClick(this.props.userDetail.id, this.state.targetKeys);
        }}
                type="primary">
          保存
        </Button>
      </div>
    </Row>;
  }

}

export default SelectRole;
