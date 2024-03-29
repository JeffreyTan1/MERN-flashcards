import express from "express"
import cors from "cors"
import decks from "./routes/decks.route.js"
import cards from "./routes/cards.route.js"
import users from "./routes/users.route.js"
import morgan from "morgan"

const app = express()
app.disable('etag');

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use("/api/v1/decks", decks)
app.use("/api/v1/cards", cards)
app.use("/api/v1/users", users)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app