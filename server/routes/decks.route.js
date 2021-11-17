import express from "express"
import { apiEdit } from "../controllers/common.controller.js"
import {apiGetDecks, apiGetAllDecks, apiPostDeck, apiUpdateDeck,
apiDeleteDeck, apiGetDeck, apiGetDeckCards} from "../controllers/decks.controller.js"
import auth from '../middleware/auth.js'
import sameUser from "../middleware/sameUser.js"

const router = express.Router()

router.get("/decks", auth, apiGetDecks)
router.get("/all", apiGetAllDecks)
router.post("/create", auth, apiPostDeck)
router.put("/update", auth, sameUser, apiUpdateDeck)
router.delete("/delete", auth, sameUser, apiDeleteDeck)
router.put("/edit", auth, sameUser, apiEdit)
router.get("/deck/:deck_id", auth, sameUser, apiGetDeck)
router.get("/deck/cards/:deck_id", auth, sameUser, apiGetDeckCards)

export default router