import request from '@/utils/request';


export async function login(params) {
  return request.post('login', params);
}

export async function logout() {
  return request.post('logout');
}

export async function loadUserPermission() {
  return request.get('permissions');
}
