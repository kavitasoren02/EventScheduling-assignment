export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, name: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getMe: () => Promise<void>
}


export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  creatorId: string
  creator: {
    id: string
    name: string
    email: string
  }
  attendeeCount: number
  isAttending: boolean
  createdAt: string
  updatedAt: string
}

export interface EventDetails extends Event {
  attendees: Array<{
    id: string
    user: {
      id: string
      name: string
      email: string
    }
    joinedAt: string
  }>
}

export interface EventContextType {
  events: Event[]
  eventDetails: EventDetails | null
  isLoading: boolean
  error: string | null
  fetchAllEvents: () => Promise<void>
  fetchEventById: (id: string) => Promise<void>
  createEvent: (data: CreateEventInput) => Promise<void>
  updateEvent: (id: string, data: CreateEventInput) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  joinEvent: (eventId: string) => Promise<void>
  leaveEvent: (eventId: string) => Promise<void>
  clearError: () => void
}

export interface CreateEventInput {
  title: string
  description: string
  date: string
  time: string
  location: string
}
