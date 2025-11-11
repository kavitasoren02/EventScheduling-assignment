
// Create Event Page - allows authenticated users to create new events
// Shows event form for creating events

import type React from "react"
import EventForm from "../components/EventForm"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const CreateEventPage: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login")
    return null
  }

  return (
    <div className="min-h-[calc(100dvh-80px)] bg-gray-50 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Event</h1>
        <p className="text-gray-600 mb-8">Fill in the details below to create your event</p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <EventForm />
        </div>
      </div>
    </div>
  )
}

export default CreateEventPage
