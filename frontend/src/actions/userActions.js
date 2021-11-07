import {API} from "../http-common"
import store from "../redux/store"
import {loginReducer, logoutReducer} from './../redux/user'

export const login = async (data) => {
  const res = await API.post(`/users/login`, data);
  store.dispatch(loginReducer(res));
  return res;
}

export const signUp = async (data) => {
  const res = await API.post(`/users/signUp`, data);
  return res;
}

export const logout = async () => {
  store.dispatch(logoutReducer())
}
