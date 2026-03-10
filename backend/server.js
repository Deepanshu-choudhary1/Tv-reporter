import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import connectDB from "./config/db.js"

import authRoutes from "./routes/auth.routes.js"
import articleRoutes from "./routes/article.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
import { errorHandler } from "./middleware/errorHandler.js"
import helmet from "helmet"





dotenv.config()

const app = express()

connectDB()

app.use(cors({
  origin: ["https://tv-reporter.onrender.com"]
}))
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
})

app.use(limiter)

app.use("/api/auth", authRoutes)
app.use("/api/articles", articleRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/", (req, res) => {
  res.send("TV Reporter API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

app.use(errorHandler)
app.use(helmet())
