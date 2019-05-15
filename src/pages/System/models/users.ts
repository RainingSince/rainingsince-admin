import {
  createUser,
  deleteUser,
  deleteUsers,
  loadUser,
  searchUser,
  updateUser,
  loadUserDetail, selectRole,
} from '@/services/system';
import { notification } from 'antd';

export default {
  namespace: 'users',
  state: {
    users: [],
    detail: { name: '', account: '', phone: '', password: '' },
  },

  effects: {

    * selectRole({ playload }, { call, put }) {
      let select = yield call(selectRole, playload);
      let response;
      if (select != undefined) {
        notification.success({
          message: '保存成功',
          description: '用户角色保存成功',
        });

        response = yield call(loadUser, { current: playload.current, step: playload.step });
      }

      if (response) {
        yield put({
          type: 'saveUser',
          playload: response,
        });
      }
    },

    * userDetail({ playload }, { call, put }) {
      let response = yield call(loadUserDetail, playload);
      if (response) {
        yield put({
          type: 'saveDetail',
          playload: response,
        });
      }
    },

    * loadUser({ playload }, { call, put }) {
      let response = yield call(loadUser, playload);
      if (response) {
        yield put({
          type: 'saveUser',
          playload: response,
        });
      }
    },

    * searchUser({ playload }, { call, put }) {
      let response = yield call(searchUser, playload);
      if (response) {
        yield put({
          type: 'saveUser',
          playload: response,
        });
      }
    },


    * updateUser({ playload }, { call, put }) {
      let update = yield call(updateUser, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '用户更新成功',
        });
        response = yield call(loadUser, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveUser',
          playload: response,
        });
      }
    },

    * deleteUser({ playload }, { call, put }) {
      let deleted = yield call(deleteUser, playload);
      let response;
      if (deleted != undefined) {
        notification.success({
          message: '删除成功',
          description: '用户删除成功',
        });
        response = yield call(loadUser, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveUser',
          playload: response,
        });
      }
    },

    * deleteUsers({ playload }, { call, put }) {
      let deleted = yield call(deleteUsers, playload);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '用户删除成功',
        });
        response = yield call(loadUser, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveUser',
          playload: response,
        });
      }
    },

    * createUser({ playload }, { call, put }) {
      let cteated = yield call(createUser, playload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '用户创建成功',
        });
        response = yield call(loadUser, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveUser',
          playload: response,
        });
      }
    },

  },

  reducers: {
    saveUser(state, { playload }) {
      return { ...state, users: playload };
    },
    saveDetail(state, { playload }) {
      return { ...state, detail: playload };
    },
  },
};
