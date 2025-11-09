// Authentication controller - handles user signup, login, and logout
// Uses bcrypt for password hashing and JWT for token generation

import type { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Sign up a new user
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body

    // Validate input
    if (!email || !name || !password) {
      res.status(400).json({ success: false, message: "Please provide all required fields" })
      return
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" })
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (error) {
    console.error("Signup error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Log in a user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      res.status(400).json({ success: false, message: "Please provide email and password" })
      return
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" })
      return
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" })
      return
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Get current user info
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ success: false, message: "Not authenticated" })
      return
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    })

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" })
      return
    }

    res.status(200).json({ success: true, user })
  } catch (error) {
    console.error("GetMe error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Log out a user
export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token")
  res.status(200).json({ success: true, message: "Logged out successfully" })
}
