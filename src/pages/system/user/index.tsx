import React, { Component } from 'react';
import { connect } from 'umi';
import { Row, Tooltip, Popconfirm } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import FormPopup from '@/components/FormPopup';
import UserForm from '@/pages/system/user/components/UserForm';
import TableFilterPage from '@/components/TableFilterPage';
import SelectRole from '@/pages/system/user/components/SelectRole';
import Authorized from '@/utils/Authorized';
import { ConnectState } from '@/models/connect';
import { DeleteOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';


export interface UserPageProps {
  users: {
    records: [],
    total: number
  },
  dispatch?: any
}

export interface UserPageState {
  drawerTitle: string,
  selectedItem: any,
  drawerShow: boolean,
  pageSize: number,
  current: number,
  selectShow: boolean
}


class UserPage extends Component<UserPageProps, UserPageState> {


  constructor(props: UserPageProps) {
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

  filterCallBack = (values: any) => {
    this.props.dispatch({
      type: 'users/searchUser',
      payload: {
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

  optionCallBack = (data: any) => {
    if (data.type === 'add') {
      this.addPermission();
    } else {
      let list = data.dataSource;
      list = list.map((item: any) => item.id);
      this.itemsDelete(list);
    }
  };

  itemUpdate = (item: any) => {
    this.setState({
      drawerTitle: '修改用户',
      drawerShow: true,
      selectedItem: item,
    });
  };

  itemDelete = (item: any) => {
    const data = Object.assign(item, {
      current: this.state.current,
      step: this.state.pageSize,
    });
    this.props.dispatch({
      type: 'users/deleteUser',
      payload: data,
    });
  };

  itemsDelete = (dataSource: any) => {
    const data = Object.assign(dataSource, {
      current: this.state.current,
      step: this.state.pageSize,
      dataSource,
    });

    this.props.dispatch({
      type: 'users/deleteUser',
      payload: data,
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

  formSubmit = (type: string, value: any) => {
    this.setState({
      drawerShow: false,
      selectedItem: {},
    });

    const data = Object.assign(value, {
      current: this.state.current,
      step: this.state.pageSize,
    });

    if (type === 'add') {
      this.props.dispatch({
        type: 'users/createUser',
        payload: data,
      });
    } else {
      this.props.dispatch({
        type: 'users/updateUser',
        payload: data,
      });
    }

  };


  permissionSelectCallBack = (id: string, selectIds: []) => {
    this.setState({
      selectShow: false,
      selectedItem: {},
    });
    this.props.dispatch({
      type: 'users/selectRole',
      payload: {
        id,
        selectIds,
        current: this.state.current,
        step: this.state.pageSize,
      },
    });
  };


  pageChange = (value: number) => {
    this.setState({
      current: value,
    });
    this.props.dispatch({
      type: 'users/loadUser',
      payload: {
        step: this.state.pageSize,
        current: value,
      },
    });
  };

  selectRole = (item: any) => {
    this.setState({
      drawerTitle: '选择角色',
      selectShow: true,
      selectedItem: item,
    });
  };

  pageTotalChange = (value: number, data: number) => {
    this.setState({
      pageSize: data,
      current: value,
    });

    this.props.dispatch({
      type: 'users/loadUser',
      payload: {
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
        sorter: (a: any, b: any) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
      },
      {
        title: '更新时间',
        dataIndex: 'updateDate',
        sorter: (a: any, b: any) => new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime(),
      },
      {
        title: '操作',
        dataIndex: '',
        render: (item: any) => {
          return <Row>
            <Authorized authority={['users:modify']}>
              <Tooltip title="修改用户">
                <EditOutlined twoToneColor="#1890FF"
                  onClick={() => this.itemUpdate(item)} />
              </Tooltip>
            </Authorized>
            <Authorized authority={['users:info', 'users:roles:choose']}>
              <Tooltip title="设置角色">
                <SettingOutlined twoToneColor="#1890FF" style={{ marginLeft: '10px' }}
                  onClick={() => this.selectRole(item)}
                />
              </Tooltip>
            </Authorized>
            <Authorized authority={['users:delete']}>
              <Tooltip title="删除用户">
                <Popconfirm
                  title="确定删除该用户吗？"
                  okText="删除"
                  onConfirm={() => this.itemDelete(item)}
                  cancelText="取消">
                  <DeleteOutlined twoToneColor="#FF0000" style={{ marginLeft: '10px' }} />
                </Popconfirm>
              </Tooltip>
            </Authorized>
          </Row >;
        },
      },
    ];

    const { users } = this.props;

    const filters = [
      { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name' },
      { type: TableFilterType.INPUT, label: '账号', dataIndex: 'account' },
    ];
    const tableOption = {
      columns,
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
      <FormPopup
        type="dialog"
        title={this.state.drawerTitle}
        closeClick={this.formCancel}
        visible={this.state.drawerShow}>
        <UserForm
          type="dialog"
          submitClick={this.formSubmit}
          cancelClick={this.formCancel}
          dataSource={this.state.selectedItem}
        />
      </FormPopup>


      <FormPopup title={this.state.drawerTitle}
        closeClick={this.formCancel}
        visible={this.state.selectShow}
        width='50%'
      >
        <SelectRole submitClick={this.permissionSelectCallBack}
          cancelClick={this.formCancel}
          dataSource={this.state.selectedItem.id} />

      </FormPopup>

    </TableFilterPage>;
  }
}


export default connect(({ users, loading }: ConnectState) => ({
  users: users.users,
  submitting: loading.effects['users/loadUser'],
}))(UserPage);
