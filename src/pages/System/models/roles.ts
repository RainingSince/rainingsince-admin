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

export default {
  namespace: 'roles',
  state: {
    roles: [],
    detail: { name: '', permissionLsit: [], remark: '' },
  },

  effects: {

    * loadAllRole({ playload }, { call, put }) {
      let response = yield call(loadAllRole, playload);
      if (response) {
        yield put({
          type: 'saveRole',
          playload: response,
        });
      }
    },

    * selectPermisssion({ playload }, { call, put }) {
      let select = yield call(selectPermission, playload);
      let response;
      if (select != undefined) {
        notification.success({
          message: '保存成功',
          description: '角色权限保存成功',
        });

        response = yield call(loadRole, { current: playload.current, step: playload.step });
      }

      if (response) {
        yield put({
          type: 'saveRole',
          playload: response,
        });
      }
    },

    * roleDetail({ playload }, { call, put }) {
      let response = yield call(loadRoleDetail, playload);
      if (response) {
        yield put({
          type: 'saveDetail',
          playload: response,
        });
      }
    },

    * loadRole({ playload }, { call, put }) {
      let response = yield call(loadRole, playload);
      if (response) {
        yield put({
          type: 'saveRole',
          playload: response,
        });
      }
    },

    * searchRole({ playload }, { call, put }) {
      let response = yield call(searchRole, playload);
      if (response) {
        yield put({
          type: 'saveRole',
          playload: response,
        });
      }
    },


    * updateRole({ playload }, { call, put }) {
      let update = yield call(updateRole, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '角色更新成功',
        });
        response = yield call(loadRole, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveRole',
          playload: response,
        });
      }
    },

    * deleteRole({ playload }, { call, put }) {
      let deleted = yield call(deleteRole, playload);
      let response;
      if (deleted != undefined) {
        notification.success({
          message: '删除成功',
          description: '角色删除成功',
        });
        response = yield call(loadRole, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveRole',
          playload: response,
        });
      }
    },

    * deleteRoles({ playload }, { call, put }) {
      let deleted = yield call(deleteRoles, playload.dataSource);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '角色删除成功',
        });
        response = yield call(loadRole, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveRole',
          playload: response,
        });
      }
    },

    * createRole({ playload }, { call, put }) {
      let cteated = yield call(createRole, playload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '角色创建成功',
        });
        response = yield call(loadRole, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveRole',
          playload: response,
        });
      }
    },

  },

  reducers: {
    saveRole(state, { playload }) {
      return { ...state, roles: playload };
    },
    saveDetail(state, { playload }) {
      return { ...state, detail: playload };
    },
  },
};
