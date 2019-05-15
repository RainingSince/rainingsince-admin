import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Row } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import FormDrawer from '@/components/FormDrawer';
import UserForm from '@/pages/System/User/components/UserForm';
import TableFilterPage from '@/components/TableFilterPage';
import SelectRole from '@/pages/System/User/components/SelectRole';
import Authorized from '@/utils/Authorized';

@Authorized.Secured(['users:list'])
@connect(({ users, loading }) => ({
  users: users.users,
  submitting: loading.effects['users/loadUser'],
}))
class UserPage extends Component<{ users, dispatch },
  { drawerTitle, selectedItem, drawerShow, pageSize, current, selectShow }> {


  constructor(props) {
    super(props);
    this.state = {
      drawerTitle: '',
      drawerShow: false,
      selectShow: false,
      selectedItem: {},
      pageSize: 10,
      current: 1,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'users/loadUser',
    });
  }

  filterCallBack = (values) => {
    this.props.dispatch({
      type: 'users/searchUser',
      playload: {
        ...values,
      },
    });
  };

  addPermission = () => {
    this.setState({
      drawerTitle: '新增用户',
      drawerShow: true,
      selectedItem: {},
    });
  };

  optionCallBack = (data) => {
    if (data.type === 'add') {
      this.addPermission();
    } else {
      let list = data.dataSource;
      list = list.map(item => item.id);
      this.itemsDelete(list);
    }
  };

  itemUpdate = (item) => {
    this.setState({
      drawerTitle: '修改用户',
      drawerShow: true,
      selectedItem: item,
    });
  };

  itemDelete = (item) => {
    item = Object.assign(item, {
      current: this.state.current,
      step: this.state.pageSize,
    });
    this.props.dispatch({
      type: 'users/deleteUser',
      playload: item.id,
    });
  };

  itemsDelete = (dataSource) => {
    let data = Object.assign(dataSource, {
      current: this.state.current,
      step: this.state.pageSize,
      dataSource: dataSource,
    });

    this.props.dispatch({
      type: 'users/deleteUser',
      playload: data,
    });
  };

  formCancel = () => {
    if (this.state.drawerShow)
      this.setState({
        drawerShow: false,
        selectedItem: {},
      });
    else
      this.setState({
        selectShow: false,
        selectedItem: {},
      });
  };

  formSubmit = (type, value) => {
    this.setState({
      drawerShow: false,
      selectedItem: {},
    });

    value = Object.assign(value, {
      current: this.state.current,
      step: this.state.pageSize,
    });

    if (type === 'add') {
      this.props.dispatch({
        type: 'users/createUser',
        playload: value,
      });
    } else {
      this.props.dispatch({
        type: 'users/updateUser',
        playload: value,
      });
    }

  };


  permissionSelectCallBack = (id, selectIds) => {
    this.setState({
      selectShow: false,
      selectedItem: {},
    });
    this.props.dispatch({
      type: 'users/selectRole',
      playload: {
        id: id,
        selectIds: selectIds,
        current: this.state.current,
        step: this.state.pageSize,
      },
    });
  };


  pageChange = (value) => {
    this.setState({
      current: value,
    });
    this.props.dispatch({
      type: 'users/loadUser',
      playload: {
        step: this.state.pageSize,
        current: value,
      },
    });
  };

  selectRole = (item) => {
    this.setState({
      drawerTitle: '选择角色',
      selectShow: true,
      selectedItem: item,
    });
  };

  pageTotalChange = (value, data) => {
    this.setState({
      pageSize: data,
      current: value,
    });

    this.props.dispatch({
      type: 'users/loadUser',
      playload: {
        step: data,
        current: value,
      },
    });
  };

  render() {
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'name',
      },
      {
        title: '用户账号',
        dataIndex: 'account',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        sorter: (a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
      },
      {
        title: '更新时间',
        dataIndex: 'updateDate',
        sorter: (a, b) => new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime(),
      },
      {
        title: '操作',
        dataIndex: '',
        render: (item) => {
          return <Row type="flex">
            <Authorized authority={['users:modify']}>
              <Icon type="edit" theme="twoTone" twoToneColor="#1890FF"
                    onClick={e => this.itemUpdate(item)}/>
            </Authorized>
            <Authorized authority={(item) =>
              item.indexOf('users:roles:choose') > -1
              && item.indexOf('users:info') > -1}>
              <Icon type="setting" theme="twoTone" twoToneColor="#1890FF" style={{ marginLeft: '10px' }}
                    onClick={e => this.selectRole(item)}
              /></Authorized>
            <Authorized authority={['users:delete']}>
              <Icon type="delete" theme="twoTone" twoToneColor="#FF0000" style={{ marginLeft: '10px' }}
                    onClick={e => this.itemDelete(item)}/>
            </Authorized>
          </Row>;
        },
      },
    ];

    const { users } = this.props;

    const filters = [
      { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name' },
      { type: TableFilterType.INPUT, label: '账号', dataIndex: 'account' },
    ];
    const tableOption = {
      columns: columns,
      data: {
        list: users.records,
        pagination:
          {
            total: users.total,
            onChange: this.pageChange,
            onShowSizeChange: this.pageTotalChange,
          },
      },
    };

    return <TableFilterPage pageTitle="用户管理"
                            filters={filters}
                            filterCallBack={this.filterCallBack}
                            optionCallBack={this.optionCallBack}
                            optionAuth={{ addAuth: ['users:add'], deleteAuth: ['users:delete'] }}
                            tableOption={tableOption}>
      <FormDrawer title={this.state.drawerTitle}
                  closeClick={this.formCancel}
                  visible={this.state.drawerShow}>
        <UserForm submitClick={this.formSubmit}
                  cancelClick={this.formCancel}
                  dataSource={this.state.selectedItem}
        />
      </FormDrawer>


      <FormDrawer title={this.state.drawerTitle}
                  closeClick={this.formCancel}
                  visible={this.state.selectShow}
                  width={'50%'}
      >
        <SelectRole submitClick={this.permissionSelectCallBack}
                    cancelClick={this.formCancel}
                    dataSource={this.state.selectedItem.id}/>

      </FormDrawer>

    </TableFilterPage>;
  }
}


export default UserPage;
