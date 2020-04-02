import React, { Component } from 'react';
import { connect } from 'umi';
import { Row, Tooltip, Popconfirm } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import FormPopup from '@/components/FormPopup';
import RoleForm from '@/pages/system/role/components/RoleForm';
import TableFilterPage from '@/components/TableFilterPage';
import SelectPermission from '@/pages/system/role/components/SelectPermission';
import Authorized from '@/utils/Authorized';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';


export interface RolePageProps {
  roles: {
    records: [],
    total: number
  },
  dispatch?: any
}

export interface RolePageState {
  drawerTitle: string,
  selectedItem: any,
  drawerShow: boolean,
  pageSize: number,
  current: number,
  selectShow: boolean,
}

class RolePage extends Component<RolePageProps, RolePageState> {

  constructor(props: RolePageProps) {
    super(props);
    this.state = {
      drawerTitle: '',
      drawerShow: false,
      selectedItem: {},
      selectShow: false,
      pageSize: 10,
      current: 1,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'roles/loadRole',
    });
  }

  filterCallBack = (values: any) => {
    this.props.dispatch({
      type: 'roles/searchRole',
      payload: {
        ...values,
      },
    });
  };

  addPermission = () => {
    this.setState({
      drawerTitle: '新增角色',
      drawerShow: true,
      selectedItem: {},
    });
  };

  itemUpdate = (item: any) => {
    this.setState({
      drawerTitle: '修改角色',
      drawerShow: true,
      selectedItem: item,
    });
  };

  selectPermission = (item: any) => {
    this.setState({
      drawerTitle: '选择权限',
      selectShow: true,
      selectedItem: item,
    });
  };

  itemDelete = (item: any) => {
    const data = Object.assign(item, {
      current: this.state.current,
      step: this.state.pageSize,
    });
    this.props.dispatch({
      type: 'roles/deleteRole',
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
      type: 'roles/deleteRoles',
      payload: data,
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

  permissionSelectCallBack = (id: string, selectIds: []) => {
    this.setState({
      selectShow: false,
      selectedItem: {},
    });
    this.props.dispatch({
      type: 'roles/selectPermission',
      payload: {
        id,
        selectIds,
        current: this.state.current,
        step: this.state.pageSize,
      },
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
        type: 'roles/createRole',
        payload: data,
      });
    } else {
      this.props.dispatch({
        type: 'roles/updateRole',
        payload: data,
      });
    }

  };

  pageChange = (value: number) => {
    this.setState({
      current: value,
    });
    this.props.dispatch({
      type: 'roles/loadRole',
      payload: {
        step: this.state.pageSize,
        current: value,
      },
    });
  };

  pageTotalChange = (value: number, data: number) => {
    this.setState({
      current: value,
      pageSize: data,
    });
    this.props.dispatch({
      type: 'roles/loadRole',
      payload: {
        step: data,
        current: value,
      },
    });
  };


  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
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
            <Authorized authority={['roles:modify']}>
              <Tooltip title="修改角色">
                <EditOutlined twoToneColor="#1890FF"
                  onClick={() => this.itemUpdate(item)} />
              </Tooltip>
            </Authorized>
            <Authorized authority={['roles:permissions:choose', 'roles:info']}>

              <Tooltip title="设置权限">
                <SettingOutlined twoToneColor="#1890FF" style={{ marginLeft: '10px' }}
                  onClick={() => this.selectPermission(item)}
                /></Tooltip>
            </Authorized>
            <Authorized authority={['roles:delete']}>
              <Tooltip title="删除角色">
                <Popconfirm
                  title="确定删除该角色吗？"
                  okText="删除"
                  onConfirm={() => this.itemDelete(item)}
                  cancelText="取消">
                  <DeleteOutlined twoToneColor="#FF0000" style={{ marginLeft: '10px' }} />
                </Popconfirm>
              </Tooltip>

            </Authorized>
          </Row>;
        },
      },
    ];

    const { roles } = this.props;

    const filters = [
      { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name' },
    ];
    const tableOption = {
      columns,
      data: {
        list: roles.records,
        pagination:
        {
          total: roles.total,
          onChange: this.pageChange,
          onShowSizeChange: this.pageTotalChange,
        },
      },
    };

    return <TableFilterPage pageTitle="用户管理"
      filters={filters}
      filterCallBack={this.filterCallBack}
      optionCallBack={this.optionCallBack}
      optionAuth={{ addAuth: ['roles:add'], deleteAuth: ['roles:delete'] }}
      tableOption={tableOption}>

      <FormPopup
        type="dialog"
        title={this.state.drawerTitle}
        closeClick={this.formCancel}
        visible={this.state.drawerShow}>

        <RoleForm
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
        <SelectPermission
          submitClick={this.permissionSelectCallBack}
          cancelClick={this.formCancel}
          dataSource={this.state.selectedItem.id} />
      </FormPopup>


    </TableFilterPage>;
  }
}


export default connect(({ roles, loading }: ConnectState) => ({
  roles: roles.roles,
  submitting: loading.effects['roles/loadrole'],
}))(RolePage);
