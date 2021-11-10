import CardsDAO from "../dao/cardsDAO.js"
import DecksDAO from "../dao/decksDAO.js"

const sameUser = async (req, res, next) => {
  const user_id = req.user_id
  const card_id = req.body.card_id != null ? req.body.card_id : req.params.card_id
  const deck_id = req.body.deck_id != null ? req.body.deck_id : req.params.deck_id

  // do a check if both do not return error
  const cardResponse = await doCheck(user_id, card_id, CardsDAO, 'Card', res)
  if(cardResponse) {return cardResponse}
  console.log('user-card check success')
  const deckResponse = await doCheck(user_id, deck_id, DecksDAO, 'Deck', res)
  if(deckResponse) {return deckResponse}
  console.log('user-deck check success')

  next()
}

const doCheck = async (user_id, doc_id, dao, str, res) => {
  if(doc_id) {
    let existingDoc = null;
    try {
      existingDoc = await dao.getOne(doc_id)
    } catch (e) {
      return res.status(500).json({ error: {message: e.message} })
    }
    if (existingDoc == null) { return res.status(404).json({error: {message: `${str} does not exist`}})}
    if(existingDoc.user_id != user_id) { return res.status(401).json({error: {message: `Not authorized to access this ${str}`}})}
  }
}

export default sameUser