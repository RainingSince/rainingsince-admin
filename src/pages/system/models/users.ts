import { Effect, Reducer } from 'umi';
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


export interface SystemUserDetail {
  name: string,
  id: string,
  account: string,
  phone: string,
  password: string,
  remark: string,
  roleList: []
}

export interface SysUserModelState {
  users: {
    records: [],
    total: number
  };
  detail: SystemUserDetail,
}

export interface UserModelType {
  namespace: 'users';
  state: SysUserModelState;
  effects: {
    selectRole: Effect;
    userDetail: Effect;
    loadUser: Effect;
    searchUser: Effect;
    updateUser: Effect;
    deleteUser: Effect;
    deleteUsers: Effect;
    createUser: Effect;
  };
  reducers: {
    saveUser: Reducer<SysUserModelState>;
    saveDetail: Reducer<SysUserModelState>;
  };
}

const UserModel: UserModelType = {


  namespace: 'users',
  state: {
    users: {
      records: [],
      total: 0
    },
    detail: { id: '', name: '', account: '', phone: '', password: '', remark: '', roleList: [] },
  },

  effects: {

    * selectRole({ payload }, { call, put }) {
      const select = yield call(selectRole, payload);
      let response;
      if (select !== undefined) {
        notification.success({
          message: '保存成功',
          description: '用户角色保存成功',
        });

        response = yield call(loadUser, { current: payload.current, step: payload.step });
      }

      if (response) {
        yield put({
          type: 'saveUser',
          payload: response,
        });
      }
    },

    * userDetail({ payload }, { call, put }) {
      const response = yield call(loadUserDetail, payload);
      if (response) {
        yield put({
          type: 'saveDetail',
          payload: response,
        });
      }
    },

    * loadUser({ payload }, { call, put }) {
      const response = yield call(loadUser, payload);
      if (response) {
        yield put({
          type: 'saveUser',
          payload: response,
        });
      }
    },

    * searchUser({ payload }, { call, put }) {
      const response = yield call(searchUser, payload);
      if (response) {
        yield put({
          type: 'saveUser',
          payload: response,
        });
      }
    },


    * updateUser({ payload }, { call, put }) {
      const update = yield call(updateUser, payload);
      let response;
      if (update !== undefined) {
        notification.success({
          message: '更新成功',
          description: '用户更新成功',
        });
        response = yield call(loadUser, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'saveUser',
          payload: response,
        });
      }
    },

    * deleteUser({ payload }, { call, put }) {
      const deleted = yield call(deleteUser, payload.id);
      let response;
      if (deleted !== undefined) {
        notification.success({
          message: '删除成功',
          description: '用户删除成功',
        });
        response = yield call(loadUser, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'saveUser',
          payload: response,
        });
      }
    },

    * deleteUsers({ payload }, { call, put }) {
      const deleted = yield call(deleteUsers, payload);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '用户删除成功',
        });
        response = yield call(loadUser, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'saveUser',
          payload: response,
        });
      }
    },

    * createUser({ payload }, { call, put }) {
      const cteated = yield call(createUser, payload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '用户创建成功',
        });
        response = yield call(loadUser, { current: payload.current, step: payload.step });
      }
      if (response) {
        yield put({
          type: 'saveUser',
          payload: response,
        });
      }
    },

  },

  reducers: {
    saveUser(state, { payload }) {
      return Object.assign(state, { users: payload });
    },
    saveDetail(state, { payload }) {
      return Object.assign(state, { detail: payload });
    },
  },

}
export default UserModel;