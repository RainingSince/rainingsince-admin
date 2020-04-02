import { reloadAuthorized } from './Authorized';


export function getAuthority(): any {

  const authority = localStorage.getItem('rs-authority');

  if (authority !== null) {
    return JSON.parse(authority)
  }

  return null;
}

export function setAuthority(authority: any): void {
  localStorage.setItem('rs-authority', JSON.stringify(authority));
  reloadAuthorized();
}

export function removeAuthority() {
  return localStorage.removeItem('rs-token');
}

export function setUserName(userName: any) {
  return localStorage.setItem('rs-user', userName);
}

export function getUserName() {
  return localStorage.getItem('rs-user');
}

export function removeUserName() {
  return localStorage.removeItem('rs-user');
}

export function getPermissions() {
  const per = localStorage.getItem('rs-permission');
  if (!per) return [];
  return JSON.parse(per);
}

export function setPermission(permission: any) {
  localStorage.removeItem('rs-permission');
  localStorage.setItem('rs-permission', JSON.stringify(permission));
}

export function removePermission() {
  localStorage.removeItem('rs-permission');
}


export function logoutCache() {
  removePermission();
  removeAuthority();
  removeUserName();
}