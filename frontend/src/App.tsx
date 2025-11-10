import './App.css'
// import type React from "react"
import { BrowserRouter } from "react-router-dom"
import Navbar from './components/Navbar'
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
