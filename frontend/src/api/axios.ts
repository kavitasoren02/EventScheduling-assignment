// Axios Configuration and Interceptors
// Configures API base URL and adds request/response interceptors for error handling

import axios from "axios"

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Enable sending cookies with requests
})

// Request interceptor - adds any necessary headers
api.interceptors.request.use(
  (config) => {
    // Any custom headers can be added here
    config.headers["Content-Type"] = "application/json"
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - handles errors globally
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - user should log in
      console.error("Unauthorized - please log in")
    } else if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error("Forbidden - you do not have permission")
    } else if (error.response?.status === 404) {
      // Not found
      console.error("Resource not found")
    } else if (error.response?.status === 500) {
      // Server error
      console.error("Server error - please try again later")
    }

    return Promise.reject(error)
  },
)

export default api
