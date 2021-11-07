import express from "express"
import {apiGetDecks, apiGetAllDecks, apiPostDeck, apiUpdateDeck,
apiDeleteDeck, apiEditCards, apiGetDeck} from "../controllers/decks.controller.js"
import auth from '../middleware/auth.js'

const router = express.Router()

router.get("/decks", auth, apiGetDecks)
router.get("/all", apiGetAllDecks)
router.post("/create", auth, apiPostDeck)
router.put("/update", auth, apiUpdateDeck)
router.delete("/delete", auth, apiDeleteDeck)
router.put("/edit", auth, apiEditCards)
router.get("/deck", auth, apiGetDeck)


export default router