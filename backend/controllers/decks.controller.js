import DecksDAO from "../dao/decksDAO.js"
import {checkSameCardUser} from "./cards.controller.js"

export const apiGetAllDecks = async (req, res, next) => {
  let deckResponse = null;
  try {
    deckResponse = await DecksDAO.getAllDecks()
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }

  let { error } = deckResponse
  if (error) { return res.status(500).json({ error })}

  let response = {
    decks: deckResponse.decksList,
  }
  return res.status(200).json(response)
}

export const apiGetDecks = async (req, res, next) => {
  const user_id = req.user_id
  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}

  let deckResponse = null;
  try {
    deckResponse = await DecksDAO.getDecks(user_id)
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }

  let response = {
    decks: deckResponse.decksList,
  }
  return res.status(200).json(response)
}

export const apiPostDeck = async (req, res, next) => {
  const user_id = req.user_id
  const name = req.body.name
  const cards = req.body.cards
  const tags = req.body.tags
  const date = new Date()

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}

  let deckResponse = null;
  try {
    deckResponse = await DecksDAO.addDeck(
      {user_id,
      name,
      cards,
      tags,
      date}
    )
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }

  let { error } = deckResponse
  if (error) { return res.status(500).json({ error })}
  return res.status(200).json({ status: "success" })
}

export const apiUpdateDeck = async (req, res, next) => {
  const user_id = req.user_id
  const deck_id = req.body.deck_id
  const name = req.body.name
  const tags = req.body.tags
  const date = new Date()

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}
  const diffUserMsg = await checkSameDeckUser(user_id, deck_id, res)
  if (diffUserMsg!= null) {return diffUserMsg}

  let deckResponse = null;
  try {
    deckResponse = await DecksDAO.updateDeck(
    {deck_id,
    name,
    tags,
    date}
    )
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }

  let { error } = deckResponse
  if (error) { return res.status(500).json({ error })}
  if (deckResponse.modifiedCount === 0) { return res.status(500).json({error: 'deck not updated'})}

  return res.status(200).json({ status: "success" })
}

export const apiDeleteDeck = async (req, res, next) => {
  const user_id = req.user_id
  const deck_id = req.body.deck_id

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}
  const diffUserMsg = await checkSameDeckUser(user_id, deck_id, res)
  if (diffUserMsg!= null) {return diffUserMsg}
  
  let deckResponse = null;
  try {      
    deckResponse = await DecksDAO.deleteDeck(
      deck_id,
    )
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }

  let { error } = deckResponse
  if (error) { return res.status(500).json({ error })}
  if (deckResponse.deletedCount === 0) { return res.status(500).json({error: 'Deck not deleted'})}

  return res.status(200).json({ status: "success" })
}

export const apiEditCards = async (req, res, next) => {
  const user_id = req.user_id
  const deck_id = req.body.deck_id
  const card_id = req.body.card_id
  const addingTo = req.body.addingTo
  const date = new Date()

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}
  const sameUserDeck = await checkSameDeckUser(user_id, deck_id, res)
  if (sameUserDeck != null) {return sameUserDeck}
  const sameUserCard = await checkSameCardUser(user_id, card_id)
  if (sameUserCard != null) {return sameUserCard}

  let deckResponse = null;
  try {
    deckResponse = await DecksDAO.editCards(
      {deck_id,
      card_id,
      addingTo,
      date}
    )
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
  let { error } = deckResponse
  if (error) { return res.status(500).json({ error })}
  if (deckResponse.modifiedCount === 0) { return res.status(500).json({error: 'Deck not updated'})}

  return res.status(200).json({ status: "success" })
}

export const apiGetDeck = async (req, res, next) => {
  const user_id = req.user_id
  const deck_id = req.body.deck_id

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}
  const diffUserMsg = await checkSameDeckUser(user_id, deck_id, res)
  if (diffUserMsg!= null) {return diffUserMsg}

  let deckResponse = null
  try {
    deckResponse = await DecksDAO.getDeck(
      deck_id
    )
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }

  let response = {
    deck: deckResponse,
  }

  return res.status(200).json(response)
}

const checkSameDeckUser = async (user_id, deck_id, res) => {
  let existingDeck = null;
  try {
    existingDeck = await DecksDAO.getDeck(deck_id)
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
  if (existingDeck == null) { return res.status(404).json({error: 'Deck does not exist'})}
  if(existingDeck.user_id != user_id) { return res.status(401).json({error: 'Unauthorized'})}
  return null
}

const checkAuthenticated = (user_id, res) => {
  if(!user_id) return res.status(401).json({error: 'Unauthenticated'})
  return null
}
