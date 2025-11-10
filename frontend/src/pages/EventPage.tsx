"use client"

// Events Page - displays all available events
// Shows events in a grid format with search functionality

import type React from "react"
import { useEffect } from "react"
import { useEvent } from "../context/EventContext"
import EventCard from "../components/EventCard"

const EventsPage: React.FC = () => {
  const { events, isLoading, error, fetchAllEvents } = useEvent()

  // Fetch events on component mount
  useEffect(() => {
    fetchAllEvents()
  }, [])

  if (isLoading && events.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Events</h1>
        <p className="text-gray-600 mb-8">Discover and join exciting events happening near you</p>

        {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No events found. Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsPage
