import {API} from "../http-common"

export const getAllCards = async () => {
  try {
    const res = await API.get(`cards/all`);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const getCards = async () => {
  try {
    const res = await API.get(`cards/cards`);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const createCard = async (data) => {
  try {
    const res = await API.post(`cards/create`, data);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const updateCard = async (data) => {
  try {
    const res = await API.put(`cards/update`, data);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const deleteCard = async (data) => {
  try {
    const res = await API.delete(`cards/delete`, {data: {card_id: data.card_id}});
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const getCard = async (id) => {
  try {
    const res = await API.get(`cards/card/` + id);
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}


export const getCardDecks = async (id) => {
  try {
    const res = await API.get(`cards/card/decks/` + id);
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }

}

export const editCard = async (data) => {
  try {
    const res = await API.put(`cards/edit`, data);
    return res
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}