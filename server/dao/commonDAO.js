import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let decks
let cards

export default class CommonDAO {
  static async injectDB(conn) {
    if (decks && cards) {
      return
    }
    try {
      cards = await conn.db(process.env.FLASHCARDS_NS).collection("cards")
      decks = await conn.db(process.env.FLASHCARDS_NS).collection("decks")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in commonDAO: ${e}`,
      )
    }
  }

  static async editCards({deck_id, card_id, addingTo, date}){
    let deck = null
    try {
      deck = await this.getOne(deck_id)
    } catch (e) {
      console.error(`Deck does not exist: ${e}`)
      return { error: e }
    }

    let deckCards = deck.cards
    // adding card to deck
    if(addingTo) {
      if(!deckCards.includes(card_id)){
        deckCards.push(card_id)
      } else {
        const alreadyExists = `Card already exists in deck`
        console.error(alreadyExists)
        return { error: alreadyExists }
      }
    } 
    // removing card from deck
    else {
      const index = deckCards.indexOf(card_id)
      if (index > -1) {
        deckCards.splice(index, 1)
      } else {
        const doesNotExist = `Card does not exist in deck`
        console.error(doesNotExist)
        return { error: doesNotExist }
      }
    }
    
    try {
      const updateResponse = await decks.updateOne(
        { _id: ObjectId(deck_id)},
        { $set: { cards: deckCards, date: date } },
      )
    } catch (e) {
      console.error(`Unable to add/remove card to/from deck: ${e}`)
      return { error: e }
    }


    let card = null
    try {
      card = await this.getOne(card_id)
    } catch (e) {
      console.error(`Deck does not exist: ${e}`)
      return { error: e }
    }

    let cardDecks = card.decks
    // adding card to deck
    if(addingTo) {
      if(!cardDecks.includes(deck_id)){
        cardDecks.push(deck_id)
      } else {
        const alreadyExists = `Card already exists in deck`
        console.error(alreadyExists)
        return { error: alreadyExists }
      }
    } 
    // removing card from deck
    else {
      const index = cardDecks.indexOf(deck_id)
      if (index > -1) {
        cardDecks.splice(index, 1)
      } else {
        const doesNotExist = `Card does not exist in deck`
        console.error(doesNotExist)
        return { error: doesNotExist }
      }
    }
    
    try {
      const updateResponse = await cards.updateOne(
        { _id: ObjectId(card_id)},
        { $set: { decks: cardDecks, date: date } },
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to add/remove deck to/from card: ${e}`)
      return { error: e }
    }

    
  }


}
