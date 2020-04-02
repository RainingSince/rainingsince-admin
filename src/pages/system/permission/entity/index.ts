export interface PermissionEntity {
    id: string,
    name: string,
    code: string,
    remark?: string
}

export interface PermissionPageProps {
    permissions: {
        records: [],
        total: number
    },
    dispatch?: any
}

export interface PermissionPageState {
    drawerTitle?: string,
    selectedItem?: PermissionEntity,
    drawerShow?: boolean,
    pageSize?: number,
    current?: number,
}