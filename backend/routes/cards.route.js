import express from "express"
import {apiGetCards, apiGetAllCards, apiPostCard,
apiUpdateCard, apiDeleteCard} from "../controllers/cards.controller.js"
import auth from '../middleware/auth.js'

const router = express.Router()

router.get("/cards", auth, apiGetCards)
router.get("/all", apiGetAllCards)
router.post("/create", auth, apiPostCard)
router.put("/update", auth, apiUpdateCard)
router.delete("/delete", auth, apiDeleteCard)


export default router