import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let users

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.FLASHCARDS_NS).collection("users")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`,
      )
    }
  }

  static async addUser({email, hashedPassword}){
    try {
      const userDoc = {
        email: email,
        password: hashedPassword
      }
      return await users.insertOne(userDoc)
    }
    catch (e) {
      console.error(`Unable to create user: ${e}`)
      return {error: e}
    }
  }

  static async getUser(email){
    const userDoc = {
      email: email
    }
    return await users.findOne(userDoc)
  }

}
