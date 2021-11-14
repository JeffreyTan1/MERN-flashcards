import express from "express"
import {apiGetCards, apiGetAllCards, apiPostCard,
apiUpdateCard, apiDeleteCard, apiGetCard, apiGetCardDecks} from "../controllers/cards.controller.js"
import { apiEdit } from "../controllers/common.controller.js"
import auth from '../middleware/auth.js'
import sameUser from "../middleware/sameUser.js"

const router = express.Router()

router.get("/cards", auth, apiGetCards)
router.get("/all", apiGetAllCards)
router.post("/create", auth, apiPostCard)
router.put("/update", auth, sameUser, apiUpdateCard)
router.delete("/delete", auth, sameUser, apiDeleteCard)
router.put("/edit", auth, sameUser, apiEdit)
router.get("/card/:card_id", auth, sameUser, apiGetCard)
router.get("/card/decks/:card_id", auth, sameUser, apiGetCardDecks)

export default router