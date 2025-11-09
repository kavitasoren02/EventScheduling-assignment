// Authentication routes
// POST /api/auth/signup - Create new user
// POST /api/auth/login - Login user
// GET /api/auth/me - Get current user
// POST /api/auth/logout - Logout user

import { Router } from "express"
import { signup, login, getMe, logout } from "../controllers/auth"
import { verifyToken } from "../middleware/auth"

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/me", verifyToken, getMe)
router.post("/logout", logout)

export default router
