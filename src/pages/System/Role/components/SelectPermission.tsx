import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Row, Transfer } from 'antd';
import { TransferItem } from 'antd/lib/transfer';


interface Permission extends TransferItem {
  id: string
}

@connect(({ roles, permissions }) => ({
  roleDetail: roles.detail,
  permissionList: roles.detail.permissionList,
  permissions: permissions.permissions,
}))
class SelectPermission extends PureComponent<{
  permissionList, permissions, roleDetail, dispatch, dataSource, submitClick, cancelClick,
}, { selectedKeys, targetKeys }> {

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      targetKeys: [],
    };
  }

  static defaultProps = {
    permissionList: [],
    permissions: [],
    dispatch: null,
    roleDetail: {},
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'roles/roleDetail',
      playload: this.props.dataSource,
    });
    this.props.dispatch({
      type: 'permissions/loadAllPermission',
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedKeys: nextProps.permissionList,
      targetKeys: nextProps.permissionList,
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
    return <span> {item.name} - {item.code} </span>;
  };

  render() {

    const { permissions } = this.props;
    const { selectedKeys, targetKeys } = this.state;


    return <Row type="flex" justify="center">
      <Transfer
        rowKey={(record: Permission) => record.id}
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
          this.props.submitClick(this.props.roleDetail.id, this.state.targetKeys);
        }}
                type="primary">
          保存
        </Button>
      </div>
    </Row>;
  }

}

export default SelectPermission;
