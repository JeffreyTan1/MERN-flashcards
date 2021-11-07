import {API} from "../http-common"

export const getAll= () => {
  try {
    const res = API.get(`cards/`);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const create= (data) => {
  try {
    const res = API.post(`cards/create`, data);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const update= (data) => {
  try {
    const res = API.put(`cards/update`, data);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const del = (data) => {
  try {
    const res = API.delete(`cards/delete`, data);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

