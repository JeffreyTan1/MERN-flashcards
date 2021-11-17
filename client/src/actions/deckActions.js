import {API} from "../http-common"

export const getAllDecks = async () => {
  try {
    const res = await API.get(`decks/all`);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const getDecks = async () => {
  try {
    const res = await API.get(`decks/decks`);
    return res;

  } catch (error) {
    const errorMessage = error.response.data.error.message;
    throw Error(errorMessage);
  }
}

export const createDeck = async (data) => {
  try {
    const res = await API.post(`decks/create`, data);
    return res

  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }

}

export const updateDeck = async (data) => {
  try {
    const res = await API.put(`decks/update`, data);
    return res
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}

export const deleteDeck = async (data) => {
  try {
    console.log(data)
    const res = await API.delete(`decks/delete`, {data: {deck_id: data.deck_id}});
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}

export const editDeck = async (data) => {
  try {
    const res = await API.put(`decks/edit`, data);
    return res
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }
}

export const getDeck = async (id) => {
  try {
    const res = await API.get(`decks/deck/` + id);
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }

}

export const getDeckCards = async (id) => {
  try {
    const res = await API.get(`decks/deck/cards/` + id);
    return res;
  } catch (error) {
    const errorMessage = error.response.data.error.message
    throw Error(errorMessage)
  }

}

