import Cookies from "js-cookie";

export function getToken(TokenKey) {
  return Cookies.get(TokenKey);
}

export function setToken(TokenKey, token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey);
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function setLocalStorage(key, value) {
  return localStorage.setItem(key, value);
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key);
}

export function getSessionStorage(string) {
  return sessionStorage[string];
}

export function setSessionStorage(key, value) {
  const set = (sessionStorage[key] = value);
  return set;
}
