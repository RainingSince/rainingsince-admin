import request from '@/utils/request';

export async function loadPermission(values) {
  return request.get('sys/permission', values);
}

export async function loadAllPermission() {
  return request.get('sys/permission/list');
}

export async function searchPermission(values) {
  return request.get('sys/permission', values);
}

export async function updatePermission(values) {
  return request.put('sys/permission', values);
}

export async function createPermission(values) {
  return request.post('sys/permission', values);
}

export async function deletePermission(values) {
  return request.delete('sys/permission/' + values);
}

export async function deletePermissions(values) {
  return request.delete('sys/permission', values);
}


export async function loadRole(values) {
  return request.get('sys/role', values);
}

export async function searchRole(values) {
  return request.get('sys/role', values);
}

export async function loadAllRole() {
  return request.get('sys/role/list');
}

export async function updateRole(values) {
  return request.put('sys/role', values);
}

export async function createRole(values) {
  return request.post('sys/role', values);
}

export async function deleteRole(values) {
  return request.delete('sys/role/' + values);
}

export async function deleteRoles(values) {
  return request.delete('sys/role', values);
}

export async function loadRoleDetail(values) {
  return request.get('sys/role/' + values);
}

export async function selectPermission(values) {
  return request.put('sys/role/' + values.id + '/select/permissions', values.selectIds);
}


export async function loadUser(values) {
  return request.get('sys/user', values);
}

export async function searchUser(values) {
  return request.get('sys/user', values);
}

export async function updateUser(values) {
  return request.put('sys/user', values);
}

export async function createUser(values) {
  return request.post('sys/user', values);
}

export async function deleteUser(values) {
  return request.delete('sys/user/' + values);
}

export async function deleteUsers(values) {
  return request.delete('sys/user', values);
}

export async function loadUserDetail(values) {
  return request.get('sys/user/' + values);
}

export async function selectRole(values) {
  return request.put('sys/user/' + values.id + '/select/roles', values.selectIds);
}
