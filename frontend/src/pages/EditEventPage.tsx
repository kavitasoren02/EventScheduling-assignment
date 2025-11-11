
// Edit Event Page - allows event creators to edit existing events
// Shows event form pre-filled with current event data

import type React from "react"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEvent } from "../context/EventContext"
import EventForm from "../components/EventForm"

const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { eventDetails, fetchEventById, isLoading } = useEvent()

  // Fetch event details on mount
  useEffect(() => {
    if (id) {
      fetchEventById(id)
    }
  }, [id])

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login")
    return null
  }

  // Check if user is creator
  if (eventDetails && eventDetails.creatorId !== user?.id) {
    navigate("/events")
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading event...</p>
        </div>
      </div>
    )
  }

  if (!eventDetails) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 text-lg mb-4">Event not found</p>
          <button
            onClick={() => navigate("/events")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Back to Events
          </button>
        </div>
      </div>
    )
  }

  const initialData = {
    title: eventDetails.title,
    description: eventDetails.description,
    date: eventDetails.date.split("T")[0],
    time: eventDetails.time,
    location: eventDetails.location,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Event</h1>
        <p className="text-gray-600 mb-8">Update your event details</p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <EventForm initialData={initialData} />
        </div>
      </div>
    </div>
  )
}

export default EditEventPage
