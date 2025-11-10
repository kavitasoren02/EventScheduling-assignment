
// Event Context - manages events state and operations
// Provides fetch, create, update, delete, and RSVP functions

import React, { createContext, useState, useCallback } from "react"
import type { Event, EventDetails, EventContextType, CreateEventInput } from "../types"
import api from "../api/axios"

export const EventContext = createContext<EventContextType | undefined>(undefined)

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Clear error message
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Fetch all events
  const fetchAllEvents = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await api.get("/events")

      if (response.data.success) {
        setEvents(response.data.events)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch events"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch event details by ID
  const fetchEventById = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await api.get(`/events/${id}`)

      if (response.data.success) {
        setEventDetails(response.data.event)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch event"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create new event
  const createEvent = useCallback(
    async (data: CreateEventInput) => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await api.post("/events", data)

        if (response.data.success) {
          // Refetch all events to update list
          await fetchAllEvents()
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Failed to create event"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [fetchAllEvents],
  )

  // Update event
  const updateEvent = useCallback(
    async (id: string, data: CreateEventInput) => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await api.put(`/events/${id}`, data)

        if (response.data.success) {
          // Update event details if currently viewing
          if (eventDetails?.id === id) {
            setEventDetails(response.data.event)
          }
          // Refetch all events
          await fetchAllEvents()
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Failed to update event"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [eventDetails, fetchAllEvents],
  )

  // Delete event
  const deleteEvent = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await api.delete(`/events/${id}`)

        if (response.data.success) {
          // If deleted event was in details view, clear it
          if (eventDetails?.id === id) {
            setEventDetails(null)
          }
          // Refetch all events
          await fetchAllEvents()
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Failed to delete event"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [eventDetails, fetchAllEvents],
  )

  // Join an event (RSVP)
  const joinEvent = useCallback(
    async (eventId: string) => {
      try {
        setError(null)
        const response = await api.post(`/events/${eventId}/join`)

        if (response.data.success) {
          // Update event details if viewing
          if (eventDetails?.id === eventId) {
            await fetchEventById(eventId)
          }
          // Refetch all events to update attending status
          await fetchAllEvents()
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Failed to join event"
        setError(errorMessage)
        throw new Error(errorMessage)
      }
    },
    [eventDetails, fetchEventById, fetchAllEvents],
  )

  // Leave an event
  const leaveEvent = useCallback(
    async (eventId: string) => {
      try {
        setError(null)
        const response = await api.post(`/events/${eventId}/leave`)

        if (response.data.success) {
          // Update event details if viewing
          if (eventDetails?.id === eventId) {
            await fetchEventById(eventId)
          }
          // Refetch all events to update attending status
          await fetchAllEvents()
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Failed to leave event"
        setError(errorMessage)
        throw new Error(errorMessage)
      }
    },
    [eventDetails, fetchEventById, fetchAllEvents],
  )

  const value: EventContextType = {
    events,
    eventDetails,
    isLoading,
    error,
    fetchAllEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent,
    clearError,
  }

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}

// Hook to use event context
export const useEvent = () => {
  const context = React.useContext(EventContext)
  if (context === undefined) {
    throw new Error("useEvent must be used within EventProvider")
  }
  return context
}
