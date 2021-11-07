import {API} from "../http-common"

export const getAll= () => {
  return API.get(`cards/`);
}

export const create= (data) => {
  return API.post(`cards/create`, data);
}

export const update= (data) => {
  return API.put(`cards/update`, data);
}

export const del = (data) => {
  return API.delete(`cards/delete`, data);
}

