import express from "express"
import {apiGetDecks, apiGetAllDecks, apiPostDeck, apiUpdateDeck,
apiDeleteDeck, apiEditCards, apiGetDeck} from "../controllers/decks.controller.js"
import auth from '../middleware/auth.js'
import sameUser from "../middleware/sameUser.js"

const router = express.Router()

router.get("/decks", auth, apiGetDecks)
router.get("/all", apiGetAllDecks)
router.post("/create", auth, apiPostDeck)
router.put("/update", auth, sameUser, apiUpdateDeck)
router.delete("/delete", auth, sameUser, apiDeleteDeck)
router.put("/edit", auth, sameUser, apiEditCards)
router.get("/deck/:deck_id", auth, sameUser, apiGetDeck)


export default router