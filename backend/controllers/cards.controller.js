import CardsDAO from "../dao/cardsDAO.js"

export const apiGetAllCards = async (req, res, next) => {
  let cardResponse = null;
  try {
    cardResponse = await CardsDAO.getAllCards()
  } catch (e) {
    return res.status(500).json({ error: {message: e.message} })
  }

  let { error } = cardResponse
  if (error) { return res.status(500).json({ error })}

  let response = {
    cards: cardResponse.cardsList,
  }
  return res.status(200).json(response)
}

export const apiGetCards = async (req, res, next) => {
  const user_id = req.user_id

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}

  let cardResponse = null;
  try {
    cardResponse = await CardsDAO.getCards(user_id)
  } catch (e) {
    return res.status(500).json({ error: {message: e.message} })
  }

  let { error } = cardResponse
  if (error) { return res.status(500).json({ error })}

  let response = {
    cards: cardResponse.cardsList,
  }
  return res.status(200).json(response)
}

export const apiPostCard = async (req, res, next) => {
  const user_id = req.user_id
  const front = req.body.front
  const back = req.body.back
  const tags = req.body.tags
  const date = new Date()

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}

  let cardResponse = null;
  try {
    cardResponse = await CardsDAO.addCard(
      {user_id,
      front,
      back,
      tags,
      date}
    )
  } catch (e) {
    return res.status(500).json({ error: {message: e.message} })
  }

  let { error } = cardResponse
  if (error) { return res.status(500).json({ error })}
  return res.status(200).json({ status: "success" })
}

export const apiUpdateCard = async (req, res, next) => {
  const user_id = req.user_id
  const card_id = req.body.card_id
  const front = req.body.front
  const back = req.body.back
  const tags = req.body.tags
  const date = new Date()

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}
  const diffUserMsg = await checkSameCardUser(user_id, card_id, res)
  if (diffUserMsg != null) { return diffUserMsg }
  let cardResponse = null;
  try {
    cardResponse = await CardsDAO.updateCard(
      {card_id,
      front,
      back,
      tags,
      date}
    )
  } catch (e) {
    return res.status(500).json({ error: {message: e.message} })
  }

  let { error } = cardResponse
  if (error) { return res.status(500).json({ error })}
  if (cardResponse.modifiedCount === 0) { return res.status(500).json({error: {message: 'card not updated'}})}

  return res.status(200).json({ status: "success" })
}

export const apiDeleteCard = async (req, res, next) => {
  const user_id = req.user_id
  const card_id = req.body.card_id

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}
  const diffUserMsg = await checkSameCardUser(user_id, card_id, res)
  if (diffUserMsg != null) {return diffUserMsg}

  let cardResponse = null;
  try {
      cardResponse = await CardsDAO.deleteCard(
      card_id,
    )
  } catch (e) {
    return res.status(500).json({ error: {message: e.message} })
  }

  let { error } = cardResponse
  if (error) { return res.status(500).json({ error })}
  if (cardResponse.deletedCount === 0) { return res.status(500).json({error: {message: 'card not deleted'}})}

  return res.status(200).json({ status: "success" })
}

export const apiGetCard = async (req, res, next) => {
  const user_id = res.user_id
  const card_id = res.body.card_id

  const unauthenticatedMsg = checkAuthenticated(user_id, res)
  if (unauthenticatedMsg != null) {return unauthenticatedMsg}
  const diffUserMsg = await checkSameCardUser(user_id, card_id, res)
  if (diffUserMsg != null) {return diffUserMsg}

  try {
    const { card } = await CardsDAO.getCard(
      card_id,
      user_id
    )
  } catch (e) {
    return res.status(500).json({ error: {message: e.message} })
  }
  
  let { error } = cardResponse
  if (error) { return res.status(500).json({ error })}

  let response = {
    card: card,
  }

  return res.status(200).json(response)
}

export const checkSameCardUser = async (user_id, card_id, res) => {
  let existingCard = null;
  try {
    existingCard = await CardsDAO.getCard(card_id)
  } catch (e) {
    return res.status(500).json({ error: {message: e.message} })
  }
  if (existingCard == null) { return res.status(404).json({error: {message: 'Card does not exist'}})}
  if(existingCard.user_id != user_id) { return res.status(401).json({error: {message: 'Unauthorized'}})}
  return null
}

const checkAuthenticated = (user_id, res) => {
  if(!user_id) return res.status(401).json({error: 'Unauthenticated'})
  return null
}
