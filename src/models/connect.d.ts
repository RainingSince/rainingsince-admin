import { MenuDataItem } from '@ant-design/pro-layout';
import { PermissionModelState } from "@/pages/system/models/permissions"
import { RoleModelState } from "@/pages/system/models/roles"
import { SysUserModelState } from "@/pages/system/models/users"
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { StateType } from './login';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    permissions?: boolean;
    roles?: boolean;
    users?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: StateType;
  permissions: PermissionModelState;
  roles: RoleModelState;
  users: SysUserModelState
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
