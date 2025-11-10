// Auth Context - manages user authentication state and operations
// Provides login, signup, logout, and getMe functions

import React, { createContext, useState, useCallback, useEffect } from "react"
import type { User, AuthContextType } from "../types"
import api from "../api/axios"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state by checking if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me")
        if (response.data.success) {
          setUser(response.data.user)
          setIsAuthenticated(true)
        }
      } catch (error) {
        // User not authenticated, clear state
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login user with email and password
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await api.post("/auth/login", { email, password })

      if (response.data.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Register new user
  const signup = useCallback(async (email: string, name: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await api.post("/auth/signup", { email, name, password })

      if (response.data.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Logout user
  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout")
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }, [])

  // Get current user info
  const getMe = useCallback(async () => {
    try {
      const response = await api.get("/auth/me")
      if (response.data.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    getMe,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
