import { Effect, Reducer } from 'umi';

import { reloadAuthorized } from '@/utils/Authorized';
import { loadUserPermission } from '@/services/user';
import { getUserName, setAuthority, setUserName, setPermission } from '@/utils/authority';



export interface CurrentUser {
  token: string,
  name: string,
  permissions: string[],
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    loadUser: Effect;
  };
  reducers: {
    saveToken: Reducer<UserModelState>;
    saveUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {
      token: "",
      name: "",
      permissions: []
    },
  },

  effects: {
    *loadUser(_, { call, put }) {

      const response = yield call(loadUserPermission);
      const userName = yield call(getUserName);

      if (response) {
        yield put({
          type: 'saveUser',
          payload: {
            permissions: response,
            name: userName,
          },
        });

        reloadAuthorized();

        yield put({
          type: 'menu/getMenuData',
        });

      }
    },
  },

  reducers: {
    saveToken(state, {payload}) {
      setAuthority(payload.token);
      setUserName(payload.name);
      return { ...state, currentUser:{...payload} };
    },

    saveUser(state, {payload}) {
      setPermission(payload.permissions);
      return { ...state,  currentUser:{...payload} } ;
    },
  },
};

export default UserModel;
