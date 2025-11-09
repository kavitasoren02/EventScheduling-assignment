import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from './routes/auth';

const app = express()

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(cookieParser())

app.use("/api/auth", authRoutes)


// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
