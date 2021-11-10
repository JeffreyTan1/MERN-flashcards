import DecksDAO from "../dao/decksDAO.js"

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
  const deck_id = req.body.deck_id
  const name = req.body.name
  const tags = req.body.tags
  const date = new Date()

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
  console.log(req)
  const deck_id = req.body.deck_id
  console.log(deck_id)

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
  const deck_id = req.body.deck_id
  const card_id = req.body.card_id
  const addingTo = req.body.addingTo
  const date = new Date()

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
  const deck_id = req.params.deck_id
  let deckResponse = null
  try {
    deckResponse = await DecksDAO.getOne(
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



