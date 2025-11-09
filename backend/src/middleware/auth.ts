// Authentication middleware - verifies JWT tokens from cookies
// Extracts user information from JWT and attaches to request

import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// Extend Express Request type to include user info
declare global {
  namespace Express {
    interface Request {
      userId?: string
      userEmail?: string
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from cookies
    const token = req.cookies.token

    if (!token) {
      res.status(401).json({ success: false, message: "No token provided" })
      return
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

    // Attach user info to request
    req.userId = decoded.userId
    req.userEmail = decoded.email

    next()
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid or expired token" })
  }
}

export const optionalVerifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any
      req.userId = decoded.userId
      req.userEmail = decoded.email
    }

    next()
  } catch (error) {
    // If token is invalid, just continue without user info
    next()
  }
}
