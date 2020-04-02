import { Effect, Reducer } from 'umi';

export interface MenuData {
    menus: [],
    breadcrumbNameMap: {},
}

export interface MenuModelState {
    menuData?: MenuData;
}

export interface MenuModelType {
    namespace: 'menus';
    state: MenuModelState;
    effects: {
        getMenuData: Effect;
    };
    reducers: {
        saveMenus: Reducer<MenuModelState>;
    };
}

const menuModel: MenuModelType = {
    namespace: "menus",
    state: {
        menuData: {
            menus: [],
            breadcrumbNameMap: {}
        }
    },
    effects: {
        *getMenuData(_, { put }) {
            yield put({
                type: 'saveMenus',
            });
        }
    },
    reducers: {
        saveMenus(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
}

export default menuModel;