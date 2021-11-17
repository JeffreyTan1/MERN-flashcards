import CardsDAO from "../dao/cardsDAO.js"
import DecksDAO from "../dao/decksDAO.js"

export const apiEdit = async (req, res, next) => {
  const deck_id = req.body.deck_id ? req.body.deck_id : req.deck_id
  const card_id = req.body.card_id
  const addingTo = req.body.addingTo ? req.body.addingTo : req.addingTo
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
    console.error(e)
    return res.status(500).json({ error: e.message })
  }

  let { error } = deckResponse
  if (error) { return res.status(500).json({ error })}
  if (deckResponse.modifiedCount === 0) { return res.status(500).json({error: 'Deck not updated'})}

  let cardResponse = null;
  try {
    cardResponse = await CardsDAO.editDecks(
      {card_id,
      deck_id,
      addingTo,
      date}
    )
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: e.message })
  }

  error = cardResponse.error
  if (error) {
    console.error(e)
    return res.status(500).json({ error })
  }
  if (cardResponse.modifiedCount === 0) {
    console.error(e) 
    return res.status(500).json({error: 'Card not updated'})
  }

  return res.status(200).json({ status: "success" })
}