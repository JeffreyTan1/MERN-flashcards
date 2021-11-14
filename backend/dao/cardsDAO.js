import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let cards

export default class CardsDAO {
  static async injectDB(conn) {
    if (cards) {
      return
    }
    try {
      cards = await conn.db(process.env.FLASHCARDS_NS).collection("cards")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in cardsDAO: ${e}`,
      )
    }
  }

  static async addCard({user_id, front, back, tags, decks, date}){
    const cardDoc = {
      user_id: user_id,
      front: front,
      back: back,
      tags: tags, // array of tags
      decks: decks,
      date: date,
    }
    try {  
      return await cards.insertOne(cardDoc)
    }
    catch (e) {
      console.error(`Unable to post card: ${e}`)
      return {error: e}
    }
  }

  static async getCards(user_id) {
    let cursor
    try {
      cursor = await cards
        .find({user_id: user_id})
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { error: e }
    }

    try {
      const cardsList = await cursor.toArray()
      return { cardsList }
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`)
      return { error: e }
    }
  }

  static async getAllCards() {
    let cursor
    try {
      cursor = await cards
        .find()
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { error: e }
    }

    try {
      const cardsList = await cursor.toArray()
      return { cardsList }
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`)
      return { error: e }
    }
  }

  static async getOne(card_id) {
    let card
    try {
      card = await cards
        .findOne({ _id: ObjectId(card_id)})
      return card
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { error: e }
    }
  }

  static async updateCard({card_id, front, back, tags, date}) {
    try {
      const updateResponse = await cards.updateOne(
        { _id: ObjectId(card_id)},
        { $set: { front: front, back: back, tags: tags, date: date } },
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update card: ${e}`)
      return { error: e }
    }
  }

  static async deleteCard(card_id){
    try {
      const deleteResponse = await cards.deleteOne({
        _id: ObjectId(card_id)
      })
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete card: ${e}`)
      return { error: e }
    }
  }

  static async getArrayCards(cardsArray) {
    const cardsIDs = cardsArray.map(card => ObjectId(card))
    let cursor
    try {
      cursor = await cards
        .find({ _id : { $in : cardsIDs } })
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { error: e }
    }

    try {
      const cardsList = await cursor.toArray()
      return { cardsList }
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`)
      return { error: e }
    }
  }

  static async editDecks({card_id, deck_id, addingTo, date}){
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
