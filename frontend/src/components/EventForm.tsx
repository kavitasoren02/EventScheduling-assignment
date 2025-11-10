
// Event Form Component - handles creating and editing events
// Shows inputs for title, description, date, time, and location

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEvent } from "../context/EventContext"
import type { CreateEventInput } from "../types"

interface EventFormProps {
  eventId?: string
  initialData?: CreateEventInput
  onSubmit?: (data: CreateEventInput) => Promise<void>
}

const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit }) => {
  const navigate = useNavigate()
  const { createEvent, updateEvent, eventDetails } = useEvent()
  const [formData, setFormData] = useState<CreateEventInput>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    location: initialData?.location || "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validate input
      if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location) {
        setError("Please fill in all fields")
        setIsLoading(false)
        return
      }

      // Check if date is in future
      const eventDate = new Date(formData.date)
      if (eventDate < new Date()) {
        setError("Event date must be in the future")
        setIsLoading(false)
        return
      }

      // Call appropriate function
      if (onSubmit) {
        await onSubmit(formData)
      } else if (initialData && eventDetails) {
        await updateEvent(eventDetails.id, formData)
      } else {
        await createEvent(formData)
      }

      navigate("/events")
    } catch (err: any) {
      setError(err.message || "Failed to save event")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Event Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Tech Meetup 2024"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your event..."
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            id="time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Downtown Community Center"
          disabled={isLoading}
        />
      </div>

      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {isLoading ? "Saving..." : "Save Event"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/events")}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EventForm
