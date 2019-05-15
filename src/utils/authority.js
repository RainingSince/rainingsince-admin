export function getAuthority(str) {
  return localStorage.getItem('mall-token');
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('mall-token', proAuthority);
}

export function removeAuthority() {
  return localStorage.removeItem('mall-token');
}

export function setUserName(userName) {
  return localStorage.setItem('mall-user', userName);
}

export function getUserName() {
  return localStorage.getItem('mall-user');
}

export function removeUserName() {
  return localStorage.removeItem('mall-user');
}

export function getPermisiions() {
  let per = localStorage.getItem('mall-permission');
  try {
    return JSON.parse(per);
  } catch (e) {
    return [];
  }
}

export function setPermission(permission) {
  localStorage.removeItem('mall-permission');
  localStorage.setItem('mall-permission', JSON.stringify(permission));
}

export function removePermission() {
  localStorage.removeItem('mall-permission');
}


export function logoutCache() {
  removePermission();
  removeAuthority();
  removeUserName();
}
