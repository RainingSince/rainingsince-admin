import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, Row } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import FormDrawer from '@/components/FormDrawer';
import CreateForm from '@/pages/System/Permission/components/CreateForm';
import TableFilterPage from '@/components/TableFilterPage';
import Authorized from '@/utils/Authorized';


@Authorized.Secured(['permissions:list'])
@connect(({ permissions, loading }) => ({
  permissions: permissions.permissions,
  submitting: loading.effects['permissions/loadPermission'],
}))
class PermissionPage extends PureComponent<{ permissions, dispatch },
  { drawerTitle, selectedItem, drawerShow, pageSize, current }> {

  constructor(props) {
    super(props);
    this.state = {
      drawerTitle: '',
      drawerShow: false,
      selectedItem: {},
      pageSize: 10,
      current: 1,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'permissions/loadPermission',
    });
  }

  filterCallBack = (values) => {
    this.props.dispatch({
      type: 'permissions/searchPermission',
      playload: {
        ...values,
      },
    });
  };

  addPermission = () => {
    this.setState({
      drawerTitle: '新增权限',
      drawerShow: true,
      selectedItem: {},
    });
  };

  itemUpdate = (item) => {
    this.setState({
      drawerTitle: '修改权限',
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
      type: 'permissions/deletePermission',
      playload: item.id,
    });
  };

  itemsDelete = (dataSource) => {
    let data = Object.assign({
      current: this.state.current,
      step: this.state.pageSize,
      dataSource: dataSource,
    });
    this.props.dispatch({
      type: 'permissions/deletePermissions',
      playload: data,
    });
  };

  formCancel = () => {
    this.setState({
      drawerShow: false,
      selectedItem: {},
    });
  };

  optionCallBack = (data) => {
    if (data.type === 'add') {
      this.addPermission();
    } else {
      let select = data.dataSource;
      select = select.map(item => item.id);
      this.itemsDelete(select);
    }
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
        type: 'permissions/createPermission',
        playload: value,
      });
    } else {
      this.props.dispatch({
        type: 'permissions/updatePermission',
        playload: value,
      });
    }

  };

  pageChange = (value) => {
    this.setState({
      current: value,
    });
    this.props.dispatch({
      type: 'permissions/loadPermission',
      playload: {
        step: this.state.pageSize,
        current: value,
      },
    });
  };

  pageTotalChange = (value, data) => {
    this.setState({
      pageSize: data,
      current: value,
    });
    this.props.dispatch({
      type: 'permissions/loadPermission',
      playload: {
        step: data,
        current: value,
      },
    });
  };


  render() {

    const columns = [
      {
        title: '权限名称',
        dataIndex: 'name',
      },
      {
        title: '权限路径',
        dataIndex: 'code',
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
            <Authorized authority={['permissions:modify']}>
              <Icon type="edit" theme="twoTone" twoToneColor="#1890FF"
                    onClick={e => this.itemUpdate(item)}/>
            </Authorized>
            <Authorized authority={['permissions:delete']}>
              <Icon type="delete" theme="twoTone" twoToneColor="#FF0000" style={{ marginLeft: '10px' }}
                    onClick={e => this.itemDelete(item)}/>
            </Authorized>
          </Row>;
        },
      },
    ];

    const { permissions } = this.props;

    const filters = [
      { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name', required: false },
      { type: TableFilterType.INPUT, label: '路径', dataIndex: 'code', required: false },
    ];

    const tableOption = {
      columns: columns,
      data: {
        list: permissions.records,
        pagination:
          {
            total: permissions.total,
            onChange: this.pageChange,
            onShowSizeChange: this.pageTotalChange,
          },
      },
    };

    return <TableFilterPage pageTitle="权限管理"
                            filters={filters}
                            filterCallBack={this.filterCallBack}
                            optionCallBack={this.optionCallBack}
                            tableOption={tableOption}
                            optionAuth={{ addAuth: ['permissions:add'], deleteAuth: ['permissions:delete'] }}
    >
      <FormDrawer title={this.state.drawerTitle}
                  closeClick={this.formCancel}
                  visible={this.state.drawerShow}>
        <CreateForm submitClick={this.formSubmit}
                    cancelClick={this.formCancel}
                    dataSource={this.state.selectedItem}
        />
      </FormDrawer>
    </TableFilterPage>;
  }

}

export default PermissionPage;
