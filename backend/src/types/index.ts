// Type definitions for the Event Scheduling Application

export interface User {
  id: string
  email: string
  name: string
  password?: string
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  location: string
  creatorId: string
  creator?: User
  attendees?: EventAttendee[]
  createdAt: Date
  updatedAt: Date
}

export interface EventAttendee {
  id: string
  userId: string
  eventId: string
  user?: User
  event?: Event
  joinedAt: Date
}
