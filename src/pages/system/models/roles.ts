import { Effect, Reducer } from 'umi';
import {
  createRole,
  deleteRole,
  deleteRoles,
  loadRole,
  searchRole,
  updateRole,
  loadRoleDetail, selectPermission, loadAllRole,
} from '@/services/system';
import { notification } from 'antd';



export interface RoleDetail {
  name: string,
  id: string,
  permissionList: [],
  remark: string
}

export interface RoleModelState {
  roles: {
    records: [],
    total: number
  };
  allRoles: [],
  detail: RoleDetail,
}

export interface RoleModelType {
  namespace: 'roles';
  state: RoleModelState;
  effects: {
    loadAllRole: Effect;
    selectPermission: Effect;
    roleDetail: Effect;
    loadRole: Effect;
    searchRole: Effect;
    updateRole: Effect;
    deleteRole: Effect;
    deleteRoles: Effect;
    createRole: Effect;
  };
  reducers: {
    saveRole: Reducer<RoleModelState>;
    saveDetail: Reducer<RoleModelState>;
    saveAllRole: Reducer<RoleModelState>;
  };
}


const RoleModel: RoleModelType = {

  namespace: 'roles',

  state: {
    roles: {
      records: [],
      total: 0
    },
    allRoles: [],
    detail: {
      id: '',
      name: '',
      permissionList: [],
      remark: ''
    }
  },


  effects: {

    * loadAllRole({ payload }, { call, put }) {
      const response = yield call(loadAllRole, payload);
      if (response) {
        yield put({
          type: 'saveAllRole',
          payload: response,
        });
      }
    },

    * selectPermission({ payload }, { call, put }) {
      const select = yield call(selectPermission, payload);
      let response;
      if (select !== undefined) {
        notification.success({
          message: '保存成功',
          description: '角色权限保存成功',
        });

        response = yield call(loadRole, { current: payload.current, step: payload.step });
      }

      if (response) {
        yield put({
          type: 'saveRole',
          payload: response,
        });
      }
    },

    * roleDetail({ payload }, { call, put }) {
      const response = yield call(loadRoleDetail, payload);
      if (response) {
        yield put({
          type: 'saveDetail',
          payload: response,
        });
      }
    },

    * loadRole({ payload }, { call, put }) {
      const response = yield call(loadRole, payload);
      if (response) {
        yield put({
          type: 'saveRole',
          payload: response,
        });
      }
    },

    * searchRole({ payload }, { call, put }) {
      const response = yield call(searchRole, payload);
      if (response) {
        yield put({
          type: 'saveRole',
          payload: response,
        });
      }
    },


    * updateRole({ payload }, { call, put }) {
      const update = yield call(updateRole, payload);
      let response;
      if (update !== undefined) {
        notification.success({
          message: '更新成功',
          description: '角色更新成功',
        });
        response = yield call(loadRole, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'saveRole',
          payload: response,
        });
      }
    },

    * deleteRole({ payload }, { call, put }) {
      const deleted = yield call(deleteRole, payload.id);
      let response;
      if (deleted !== undefined) {
        notification.success({
          message: '删除成功',
          description: '角色删除成功',
        });
        response = yield call(loadRole, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'saveRole',
          payload: response,
        });
      }
    },

    * deleteRoles({ payload }, { call, put }) {
      const deleted = yield call(deleteRoles, payload.dataSource);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '角色删除成功',
        });
        response = yield call(loadRole, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'saveRole',
          payload: response,
        });
      }
    },

    * createRole({ payload }, { call, put }) {
      const cteated = yield call(createRole, payload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '角色创建成功',
        });
        response = yield call(loadRole, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'saveRole',
          payload: response,
        });
      }
    },

  },

  reducers: {
    saveRole(state, { payload }) {
      return Object.assign(state, { roles: payload });
    },

    saveAllRole(state, { payload }) {
      return Object.assign(state, { allRoles: payload });
    },

    saveDetail(state, { payload }) {
      return Object.assign(state, { detail: payload });
    },
  },
}

export default RoleModel;