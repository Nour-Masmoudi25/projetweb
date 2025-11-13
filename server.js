import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import eventRoutes from "./routes/events.js"
import userRoutes from "./routes/users.js"
import { authMiddleware } from "./middleware/auth.js"

dotenv.config()

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: true }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/supevent")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/users", authMiddleware, userRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
