import request from '@/utils/request';


export async function login(params:any) {
  return request.post('/api/login', params);
}

export async function logout() {
  return request.post('/api/logout');
}

export async function loadUserPermission() {
  return request.get('/api/permissions');
}
