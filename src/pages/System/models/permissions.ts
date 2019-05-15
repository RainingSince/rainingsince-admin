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

export default {
  namespace: 'permissions',
  state: {
    permissions: [],
  },

  effects: {

    *loadAllPermission({ playload }, { call, put }){
      let response = yield call(loadAllPermission, playload);
      if (response) {
        yield put({
          type: 'savePermission',
          playload: response,
        });
      }
    },

    * loadPermission({ playload }, { call, put }) {
      let response = yield call(loadPermission, playload);
      if (response) {
        yield put({
          type: 'savePermission',
          playload: response,
        });
      }
    },

    * searchPermission({ playload }, { call, put }) {
      let response = yield call(searchPermission, playload);
      if (response) {
        yield put({
          type: 'savePermission',
          playload: response,
        });
      }
    },


    * updatePermission({ playload }, { call, put }) {
      let update = yield call(updatePermission, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '权限更新成功',
        });
        response = yield call(loadPermission, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'savePermission',
          playload: response,
        });
      }
    },

    * deletePermission({ playload }, { call, put }) {
      let deleted = yield call(deletePermission, playload);
      let response;
      if (deleted != undefined) {
        notification.success({
          message: '删除成功',
          description: '权限删除成功',
        });
        response = yield call(loadPermission, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'savePermission',
          playload: response,
        });
      }
    },

    * deletePermissions({ playload }, { call, put }) {
      let deleted = yield call(deletePermissions, playload.dataSource);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '权限删除成功',
        });
        response = yield call(loadPermission, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'savePermission',
          playload: response,
        });
      }
    },

    * createPermission({ playload }, { call, put }) {
      let cteated = yield call(createPermission, playload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '权限创建成功',
        });
        response = yield call(loadPermission, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'savePermission',
          playload: response,
        });
      }
    },

  },

  reducers: {
    savePermission(state, { playload }) {
      return { ...state, permissions: playload };
    },
  },
};
