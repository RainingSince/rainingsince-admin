import { Effect, Reducer } from 'umi';
import {
  loadPermission,
  loadAllPermission,
  searchPermission,
  deletePermission,
  updatePermission,
  createPermission,
  deletePermissions,
} from '@/services/system';

import { notification } from 'antd';


export interface PermissionModelState {
  permissions: {
    records: [],
    total: number
  };
  allPermissions: []
}

export interface PermissionModelType {
  namespace: 'permissions';
  state: PermissionModelState;
  effects: {
    loadAllPermission: Effect;
    loadPermission: Effect;
    searchPermission: Effect;
    updatePermission: Effect;
    deletePermission: Effect;
    deletePermissions: Effect;
    createPermission: Effect;
  };
  reducers: {
    savePermission: Reducer<PermissionModelState>;
    saveAllPermission: Reducer<PermissionModelState>;
  };
}

const PermissionModel: PermissionModelType = {

  namespace: 'permissions',

  state: {
    allPermissions: [],
    permissions: {
      records: [],
      total: 0
    }
  },

  effects: {
    *loadAllPermission({ payload }, { call, put }) {
      const response = yield call(loadAllPermission, payload);
      if (response) {
        yield put({
          type: 'saveAllPermission',
          payload: response,
        });
      }
    },

    * loadPermission({ payload }, { call, put }) {
      const response = yield call(loadPermission, payload);
      if (response) {
        yield put({
          type: 'savePermission',
          payload: response,
        });
      }
    },

    * searchPermission({ payload }, { call, put }) {
      const response = yield call(searchPermission, payload);
      if (response) {
        yield put({
          type: 'savePermission',
          payload: response,
        });
      }
    },


    * updatePermission({ payload }, { call, put }) {
      const update = yield call(updatePermission, payload);
      let response;
      if (update !== undefined) {
        notification.success({
          message: '更新成功',
          description: '权限更新成功',
        });
        response = yield call(loadPermission, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'savePermission',
          payload: response,
        });
      }
    },

    * deletePermission({ payload }, { call, put }) {
      const deleted = yield call(deletePermission, payload.id);
      let response;
      if (deleted !== undefined) {
        notification.success({
          message: '删除成功',
          description: '权限删除成功',
        });
        response = yield call(loadPermission, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'savePermission',
          payload: response,
        });
      }
    },

    * deletePermissions({ payload }, { call, put }) {
      const deleted = yield call(deletePermissions, payload.dataSource);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '权限删除成功',
        });
        response = yield call(loadPermission, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'savePermission',
          payload: response,
        });
      }
    },

    * createPermission({ payload }, { call, put }) {
      const cteated = yield call(createPermission, payload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '权限创建成功',
        });
        response = yield call(loadPermission, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'savePermission',
          payload: response,
        });
      }
    },

  },

  reducers: {
    savePermission(state, { payload }) {
      return Object.assign(state, { permissions: payload });
    },

    saveAllPermission(state, { payload }) {
      return Object.assign(state, { allPermissions: payload })
    },
  },
};

export default PermissionModel;
