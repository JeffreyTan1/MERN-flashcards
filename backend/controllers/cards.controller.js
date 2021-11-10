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
  const card_id = req.body.card_id
  const front = req.body.front
  const back = req.body.back
  const tags = req.body.tags
  const date = new Date()

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
  const card_id = req.body.card_id

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
  const card_id = req.params.card_id

  let cardResponse = null
  try {
    cardResponse = await CardsDAO.getOne(
      card_id,
    )
    console.log(cardResponse)
  } catch (e) {
    return res.status(500).json({ error: {message: e.message} })
  }

  let response = {
    card: cardResponse,
  }

  return res.status(200).json(response)
}
