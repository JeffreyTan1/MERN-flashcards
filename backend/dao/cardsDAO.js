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

  static async addCard({user_id, front, back, tags, date}){
    const cardDoc = {
      user_id: user_id,
      front: front,
      back: back,
      tags: tags, // array of tags
      date: date
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

  static async getCard(card_id) {
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

}
