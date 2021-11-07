import {API} from "../http-common"

export const getAll = async () => {
  return API.get(`decks/`);
}

export const create = async (data) => {
  return API.post(`decks/create`, data);
}

export const update = async (data) => {
  return API.put(`decks/update`, data);
}

export const del = async (data) => {
  return API.delete(`decks/delete`, data);
}

export const edit = async (data) => {
  return API.put(`decks/edit`, data);
}

export const getDeck = async (data) => {
  return API.get(`decks/deck`, data);
}

