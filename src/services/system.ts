import request from '@/utils/request';

export async function loadPermission(values: any) {
  return request.get('/api/sys/permission', { params: values });
}

export async function loadAllPermission() {
  return request.get('/api/sys/permission/list');
}

export async function searchPermission(values: any) {
  return request.get('/api/sys/permission', { params: values });
}

export async function updatePermission(values: any) {
  return request.put('/api/sys/permission', { data: values });
}

export async function createPermission(values: any) {
  return request.post('/api/sys/permission', { data: values });
}

export async function deletePermission(values: any) {
  return request.delete(`/api/sys/permission/${values}`);
}

export async function deletePermissions(values: any) {
  return request.delete('/api/sys/permission', { data: values });
}


export async function loadRole(values: any) {
  return request.get('/api/sys/role', { params: values });
}

export async function searchRole(values: any) {
  return request.get('/api/sys/role', { params: values });
}

export async function loadAllRole() {
  return request.get('/api/sys/role/list');
}

export async function updateRole(values: any) {
  return request.put('/api/sys/role', { data: values });
}

export async function createRole(values: any) {
  return request.post('/api/sys/role', { data: values });
}

export async function deleteRole(values: any) {
  return request.delete(`/api/sys/role/${values}`);
}

export async function deleteRoles(values: any) {
  return request.delete('/api/sys/role', { data: values });
}

export async function loadRoleDetail(values: any) {
  return request.get(`/api/sys/role/${values}`);
}

export async function selectPermission(values: any) {
  return request.put(`/api/sys/role/${values.id}/select/permissions`, { data: values.selectIds });
}


export async function loadUser(values: any) {
  return request.get('/api/sys/user', { params: values });
}

export async function searchUser(values: any) {
  return request.get('/api/sys/user', { params: values });
}

export async function updateUser(values: any) {
  return request.put('/api/sys/user', { data: values });
}

export async function createUser(values: any) {
  return request.post('/api/sys/user', { data: values });
}

export async function deleteUser(values: any) {
  return request.delete(`/api/sys/user/${values}`);
}

export async function deleteUsers(values: any) {
  return request.delete('/api/sys/user', { data: values });
}

export async function loadUserDetail(values: any) {
  return request.get(`/api/sys/user/${values}`);
}

export async function selectRole(values: any) {
  return request.put(`/api/sys/user/${values.id}/select/roles`, { data: values.selectIds });
}