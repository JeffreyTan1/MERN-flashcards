import {API} from "../http-common"
import store from "../redux/store"
import {loginReducer, logoutReducer} from './../redux/user'

export const login = async (data) => {
  try {
    const res = await API.post(`users/login`, data);
    store.dispatch(loginReducer(res.data));
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}

export const signUp = async (data) => {
  try {
    const res = await API.post(`/users/signUp`, data);
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}

export const logout = async () => {
  try{
    store.dispatch(logoutReducer())
  } catch (error) {
    console.log(error)
  }

}
