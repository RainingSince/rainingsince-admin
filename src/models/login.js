import { login, logout } from '@/services/user';
import { routerRedux } from 'dva/router';
import { logoutCache } from '@/utils/authority';

export default {

  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login({ playload }, { call, put }) {
      let response = yield  call(login, playload);

      yield put({
        type: 'changeLoginStatus',
        playload: response,
      });

      if (response.token) {
        yield put({
          type: 'user/saveToken',
          playload: response,
        });
        yield put(routerRedux.replace('/'));
      }
    },

    * logout({ playload }, { call, put }) {
      let res = yield call(logout);
      logoutCache();
      yield put(routerRedux.replace('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { playload }) {
      return { ...state, ...playload };
    },
  },

};
