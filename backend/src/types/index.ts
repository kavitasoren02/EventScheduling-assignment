// Type definitions for the Event Scheduling Application

export interface User {
  id: string
  email: string
  name: string
  password?: string
  createdAt: Date
  updatedAt: Date
}