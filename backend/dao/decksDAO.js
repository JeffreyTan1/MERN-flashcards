import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let decks

export default class DecksDAO {
  static async injectDB(conn) {
    if (decks) {
      return
    }
    try {
      decks = await conn.db(process.env.FLASHCARDS_NS).collection("decks")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in decksDAO: ${e}`,
      )
    }
  }

  static async addDeck({user_id, name, cards, tags, date}){
    const deckDoc = {
      name: name,
      user_id: user_id,
      cards: cards, // array of cards
      tags: tags, // array of tags
      date: date
    }
    try { 
      return await decks.insertOne(deckDoc)
    }
    catch (e) {
      console.error(`Unable to post deck: ${e}`)
      return {error: e}
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
      return updateResponse
    } catch (e) {
      console.error(`Unable to add/remove card to/from deck: ${e}`)
      return { error: e }
    }
    
  }

  static async getOne(deck_id) {
    let deck
    try {
      deck = await decks
        .findOne({_id: ObjectId(deck_id)})
      return deck
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { error: e }
    }
  }

  static async getAllDecks() {
    let cursor
    try {
      cursor = await decks
        .find()
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { decksList: []}
    }

    try {
      const decksList = await cursor.toArray()
      return { decksList }
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`)
      return { decksList: [] }
    }
  }

  static async getDecks(user_id) {
    let cursor
    try {
      cursor = await decks
        .find({user_id: user_id})
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { error: e }
    }

    try {
      const decksList = await cursor.toArray()
      return { decksList }
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`)
      return { error: e }
    }
  }

  static async updateDeck({deck_id, name, tags, date}){
    try {
      const updateResponse = await decks.updateOne(
        { _id: ObjectId(deck_id)},
        { $set: { name: name, tags: tags, date: date } },
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update deck: ${e}`)
      return { error: e }
    }
  }

  static async deleteDeck(deck_id){
    try {
      const deleteResponse = await decks.deleteOne({
        _id: ObjectId(deck_id)
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete deck: ${e}`)
      return { error: e }
    }
  }

  static async getArrayDecks(decksArray) {
    const decksIDs = decksArray.map(deck => ObjectId(deck))
    let cursor
    try {
      cursor = await decks
        .find({ _id : { $in : decksIDs } })
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { error: e }
    }

    try {
      const decksList = await cursor.toArray()
      return { decksList }
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`)
      return { error: e }
    }
  }

}
