import React, { Component } from 'react';
import { connect } from 'umi';
import { Row, Tooltip, Popconfirm } from 'antd';
import { ConnectState } from '@/models/connect';
import { TableFilterType } from '@/components/TableFilter';
import FormPopup from '@/components/FormPopup';
import CreatePermissionForm from '@/pages/system/permission/components/CreatePermissionForm';
import TableFilterPage from '@/components/TableFilterPage';
import Authorized from '@/utils/Authorized';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PermissionEntity, PermissionPageProps, PermissionPageState } from './entity';


class PermissionPage extends Component<PermissionPageProps, PermissionPageState> {

    constructor(props: PermissionPageProps) {
        super(props);
        this.state = {
            drawerTitle: '',
            drawerShow: false,
            selectedItem: {
                id: '',
                name: '',
                remark: '',
                code: ''
            },
            pageSize: 10,
            current: 1,
        }
    }

    componentDidMount() {

        this.props.dispatch({
            type: 'permissions/loadPermission',
        });
    }


    filterCallBack = (values: PermissionEntity) => {
        this.props.dispatch({
            type: 'permissions/searchPermission',
            payload: {
                ...values,
            },
        });
    };

    addPermission = () => {
        this.setState({
            drawerTitle: '新增权限',
            drawerShow: true,
            selectedItem: {
                id: '',
                name: '',
                remark: '',
                code: ''
            },
        });
    };

    itemUpdate = (item: any) => {
        this.setState({
            drawerTitle: '修改权限',
            drawerShow: true,
            selectedItem: item,
        });
    };

    itemDelete = (dataSource: PermissionEntity) => {
        const data = Object.assign({
            current: this.state.current,
            step: this.state.pageSize,
            dataSource,
        });
        this.props.dispatch({
            type: 'permissions/deletePermission',
            payload: data,
        });
    };

    itemsDelete = (dataSource: PermissionEntity) => {
        const data = Object.assign({
            current: this.state.current,
            step: this.state.pageSize,
            dataSource,
        });
        this.props.dispatch({
            type: 'permissions/deletePermissions',
            payload: data,
        });
    };

    formCancel = () => {
        this.setState({
            drawerShow: false,
            selectedItem: {
                id: '',
                name: '',
                remark: '',
                code: ''
            },
        });
    };

    optionCallBack = (data: any) => {
        if (data.type === 'add') {
            this.addPermission();
        } else {
            let select = data.dataSource;
            select = select.map((item: any) => item.id);
            this.itemsDelete(select);
        }
    };

    formSubmit = (type: string, value: PermissionEntity) => {
        this.setState({
            drawerShow: false,
            selectedItem: {
                id: '',
                name: '',
                remark: '',
                code: ''
            },
        });

        const data = Object.assign(value, {
            current: this.state.current,
            step: this.state.pageSize,
        });

        if (type === 'add') {
            this.props.dispatch({
                type: 'permissions/createPermission',
                payload: data,
            });
        } else {
            this.props.dispatch({
                type: 'permissions/updatePermission',
                payload: data,
            });
        }

    };

    pageChange = (value: number) => {
        this.setState({
            current: value,
        });
        this.props.dispatch({
            type: 'permissions/loadPermission',
            payload: {
                step: this.state.pageSize,
                current: value,
            },
        });
    };

    pageTotalChange = (value: number, data: number) => {
        this.setState({
            pageSize: data,
            current: value,
        });
        this.props.dispatch({
            type: 'permissions/loadPermission',
            payload: {
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
                render: (item: PermissionEntity) => {
                    return <Row>
                        <Authorized authority={['permissions:modify']}>
                            <Tooltip title="修改权限">
                                <EditOutlined twoToneColor="#1890FF"
                                    onClick={() => this.itemUpdate(item)} />
                            </Tooltip>
                        </Authorized>
                        <Authorized authority={['permissions:delete']}>
                            <Tooltip title="删除权限">
                                <Popconfirm
                                    title="确定删除该权限吗？"
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

        const { permissions } = this.props;

        const filters = [
            { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name', required: false },
            { type: TableFilterType.INPUT, label: '路径', dataIndex: 'code', required: false },
        ];

        const tableOption = {
            columns,
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
            <FormPopup
                type="dialog"
                title={this.state.drawerTitle}
                closeClick={this.formCancel}
                visible={this.state.drawerShow}>
                <CreatePermissionForm
                    type="dialog"
                    submitClick={this.formSubmit}
                    cancelClick={this.formCancel}
                    dataSource={this.state.selectedItem}
                />
            </FormPopup>
        </TableFilterPage>

    }

}

export default connect(({ permissions, loading }: ConnectState) => ({
    permissions: permissions.permissions,
    submitting: loading.effects['permissions/loadPermission'],
}))(PermissionPage);
