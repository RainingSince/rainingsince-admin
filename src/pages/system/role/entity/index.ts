
export interface RoleEntity {
    id: string
    name: string,
    remark?: string
}

export interface RoleFormProps {
    submitClick: Function,
    cancelClick: () => void,
    dataSource: RoleEntity,
    dispatch?: any,
    type?: string
}