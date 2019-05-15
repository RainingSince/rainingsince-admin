import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Row } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import FormDrawer from '@/components/FormDrawer';
import RoleForm from '@/pages/System/Role/components/RoleForm';
import TableFilterPage from '@/components/TableFilterPage';
import SelectPermission from '@/pages/System/Role/components/SelectPermission';
import Authorized from '@/utils/Authorized';


@Authorized.Secured(['roles:list'])
@connect(({ roles, loading }) => ({
  roles: roles.roles,
  submitting: loading.effects['roles/loadrole'],
}))
class RolePage extends Component<{ roles, dispatch },
  { drawerTitle, selectedItem, drawerShow, pageSize, current, selectShow }> {

  constructor(props) {
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

  filterCallBack = (values) => {
    this.props.dispatch({
      type: 'roles/searchRole',
      playload: {
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

  itemUpdate = (item) => {
    this.setState({
      drawerTitle: '修改角色',
      drawerShow: true,
      selectedItem: item,
    });
  };

  selectPermission = (item) => {
    this.setState({
      drawerTitle: '选择权限',
      selectShow: true,
      selectedItem: item,
    });
  };

  itemDelete = (item) => {
    item = Object.assign(item, {
      current: this.state.current,
      step: this.state.pageSize,
    });
    this.props.dispatch({
      type: 'roles/deleteRole',
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
      type: 'roles/deleteRoles',
      playload: data,
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

  permissionSelectCallBack = (id, selectIds) => {
    this.setState({
      selectShow: false,
      selectedItem: {},
    });
    this.props.dispatch({
      type: 'roles/selectPermisssion',
      playload: {
        id: id,
        selectIds: selectIds,
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
        type: 'roles/createRole',
        playload: value,
      });
    } else {
      this.props.dispatch({
        type: 'roles/updateRole',
        playload: value,
      });
    }

  };

  pageChange = (value) => {
    this.setState({
      current: value,
    });
    this.props.dispatch({
      type: 'roles/loadRole',
      playload: {
        step: this.state.pageSize,
        current: value,
      },
    });
  };

  pageTotalChange = (value, data) => {
    this.setState({
      current: value,
      pageSize: data,
    });
    this.props.dispatch({
      type: 'roles/loadRole',
      playload: {
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
            <Authorized authority={['roles:modify']}>
              <Icon type="edit" theme="twoTone" twoToneColor="#1890FF"
                    onClick={e => this.itemUpdate(item)}/>
            </Authorized>
            <Authorized authority={(item) =>
              item.indexOf('roles:permissions:choose') > -1
              && item.indexOf('roles:info') > -1
            }>
              <Icon type="setting" theme="twoTone" twoToneColor="#1890FF" style={{ marginLeft: '10px' }}
                    onClick={e => this.selectPermission(item)}
              />
            </Authorized>
            <Authorized authority={['roles:delete']}>
              <Icon type="delete" theme="twoTone" twoToneColor="#FF0000" style={{ marginLeft: '10px' }}
                    onClick={e => this.itemDelete(item)}/>
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
      columns: columns,
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

      <FormDrawer title={this.state.drawerTitle}
                  closeClick={this.formCancel}
                  visible={this.state.drawerShow}>

        <RoleForm submitClick={this.formSubmit}
                  cancelClick={this.formCancel}
                  dataSource={this.state.selectedItem}
        />

      </FormDrawer>

      <FormDrawer title={this.state.drawerTitle}
                  closeClick={this.formCancel}
                  visible={this.state.selectShow}
                  width={'50%'}
      >
        <SelectPermission
          submitClick={this.permissionSelectCallBack}
          cancelClick={this.formCancel}
          dataSource={this.state.selectedItem.id}/>
      </FormDrawer>


    </TableFilterPage>;
  }
}


export default RolePage;
