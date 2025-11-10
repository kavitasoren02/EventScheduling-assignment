// Login Page - allows users to log in to their account
// Shows login form and link to signup page

import type React from "react"
import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100dvh-90px)] bg-gradient-to-br  from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-8">Log in to your account to continue</p>

        <LoginForm />

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
