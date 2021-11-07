import {API} from "../http-common"

export const getAll = async () => {
  try {
    const res = await API.get(`decks/`);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const create = async (data) => {
  try {
    const res = await API.post(`decks/create`, data);
    return res

  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }

}

export const update = async (data) => {
  try {
    const res = await API.put(`decks/update`, data);
    return res
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}

export const del = async (data) => {
  try {
    const res = await API.delete(`decks/delete`, data);
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}

export const edit = async (data) => {
  try {
    const res = await API.put(`decks/edit`, data);
    return res
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}

export const getDeck = async (data) => {
  try {
    const res = await API.get(`decks/deck`, data);
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }

}

