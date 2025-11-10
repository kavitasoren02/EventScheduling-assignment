// Event Card Component - displays event information in a card format
// Shows title, date, time, location, and attendee count

import type React from "react"
import { Link } from "react-router-dom"
import type { Event } from "../types"

interface EventCardProps {
  event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <Link to={`/events/${event.id}`} className="no-underline">
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-200 cursor-pointer h-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{event.title}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Date:</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Time:</span>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Location:</span>
            <span>{event.location}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">by {event.creator.name}</span>
          <span className="text-xs font-semibold text-blue-600">
            {event.attendeeCount} {event.attendeeCount === 1 ? "attendee" : "attendees"}
          </span>
        </div>

        {event.isAttending && (
          <div className="mt-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded text-center">
            You're attending
          </div>
        )}
      </div>
    </Link>
  )
}

export default EventCard
