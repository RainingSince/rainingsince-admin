import { getUserName, setAuthority, setPermission, setUserName } from '@/utils/authority';
import { loadUserPermission } from '@/services/user';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'user',

  state: {
    token: '',
    name: '',
    permissions: [],
  },

  effects: {

    * loadUser({ payload }, { call, put }) {
      let response = yield  call(loadUserPermission);
      let userName = yield  call(getUserName);
      if (response) {
        yield put({
          type: 'saveUser',
          playload: {
            permissions: response,
            name: userName,
          },
        });
        reloadAuthorized();

        yield put({
          type: 'menu/getMenuData',
          payload: { ...payload },
        });
      }
    },

  },

  reducers: {
    saveToken(state, { playload }) {
      setAuthority(playload.token);
      setUserName(playload.name);
      return { ...state, ...playload };
    },

    saveUser(state, { playload }) {
      setPermission(playload.permissions);
      return { ...state, ...playload };
    },
  },
};
