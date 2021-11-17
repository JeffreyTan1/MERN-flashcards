import express from "express"
import {apiPostLogin, apiPostSignUp} from "../controllers/users.controller.js"

const router = express.Router()

router.post("/login", apiPostLogin)
router.post("/signUp", apiPostSignUp)

export default router