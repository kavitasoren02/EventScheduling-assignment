
// Event Details Page - shows full event information and attendees
// Allows users to join/leave events and edit/delete if creator

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useEvent } from "../context/EventContext"
import { useAuth } from "../context/AuthContext"

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { eventDetails, fetchEventById, isLoading, joinEvent, leaveEvent, deleteEvent } = useEvent()
  const { user } = useAuth()
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [actionError, setActionError] = useState("")

  // Fetch event details on mount
  useEffect(() => {
    if (id) {
      fetchEventById(id)
    }
  }, [id])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Handle join event
  const handleJoinEvent = async () => {
    if (!id) return

    setIsActionLoading(true)
    setActionError("")

    try {
      await joinEvent(id)
    } catch (err: any) {
      setActionError(err.message || "Failed to join event")
    } finally {
      setIsActionLoading(false)
    }
  }

  // Handle leave event
  const handleLeaveEvent = async () => {
    if (!id) return

    if (!window.confirm("Are you sure you want to leave this event?")) {
      return
    }

    setIsActionLoading(true)
    setActionError("")

    try {
      await leaveEvent(id)
    } catch (err: any) {
      setActionError(err.message || "Failed to leave event")
    } finally {
      setIsActionLoading(false)
    }
  }

  // Handle delete event
  const handleDeleteEvent = async () => {
    if (!id) return

    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return
    }

    setIsActionLoading(true)

    try {
      await deleteEvent(id)
      navigate("/events")
    } catch (err: any) {
      setActionError(err.message || "Failed to delete event")
      setIsActionLoading(false)
    }
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
        <div className="max-w-4xl mx-auto text-center">
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

  const isCreator = user?.id === eventDetails.creatorId
  const isAttending = eventDetails.isAttending

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate("/events")}
          className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
        >
          ← Back to Events
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Main Info */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{eventDetails.title}</h1>
                <p className="text-gray-600 text-lg">by {eventDetails.creator.name}</p>
              </div>

              {isCreator && (
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-event/${eventDetails.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteEvent}
                    disabled={isActionLoading}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-700 text-lg mb-6">{eventDetails.description}</p>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Date</p>
                <p className="text-lg text-gray-900">{formatDate(eventDetails.date)}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Time</p>
                <p className="text-lg text-gray-900">{eventDetails.time}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-semibold text-gray-600 mb-1">Location</p>
                <p className="text-lg text-gray-900">{eventDetails.location}</p>
              </div>
            </div>

            {/* Action Buttons */}
            {!isCreator && (
              <div>
                {actionError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {actionError}
                  </div>
                )}
                <button
                  onClick={isAttending ? handleLeaveEvent : handleJoinEvent}
                  disabled={isActionLoading}
                  className={`w-full font-semibold py-3 rounded-lg transition duration-200 ${
                    isAttending
                      ? "bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white"
                      : "bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white"
                  }`}
                >
                  {isActionLoading ? "Loading..." : isAttending ? "Leave Event" : "Join Event"}
                </button>
              </div>
            )}
          </div>

          {/* Attendees List */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendees ({eventDetails.attendees.length})</h2>

            {eventDetails.attendees.length === 0 ? (
              <p className="text-gray-600">No one has joined yet. Be the first!</p>
            ) : (
              <div className="space-y-3">
                {eventDetails.attendees.map((attendee) => (
                  <div key={attendee.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{attendee.user.name}</p>
                      <p className="text-sm text-gray-600">{attendee.user.email}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(attendee.joinedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
