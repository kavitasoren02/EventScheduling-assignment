// Event controller - handles event creation, reading, updating, and deletion
// Also manages event attendee list

import type { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get all events with attendee count
export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await prisma.event.findMany({
      include: {
        creator: { select: { id: true, name: true, email: true } },
        attendees: { select: { userId: true } },
      },
      orderBy: { date: "asc" },
    })

    const eventsWithCount = events.map((event: any) => ({
      ...event,
      attendeeCount: event.attendees.length,
      isAttending: req.userId ? event.attendees.some((a: any) => a.userId === req.userId) : false,
      attendees: undefined, // Remove raw attendees array
    }))

    res.status(200).json({ success: true, events: eventsWithCount })
  } catch (error) {
    console.error("Get all events error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Get event by ID with full attendee list
export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        attendees: {
          include: { user: { select: { id: true, name: true, email: true } } },
          orderBy: { joinedAt: "asc" },
        },
      },
    })

    if (!event) {
      res.status(404).json({ success: false, message: "Event not found" })
      return
    }

    res.status(200).json({ success: true, event })
  } catch (error) {
    console.error("Get event by ID error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Create a new event (only authenticated users)
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ success: false, message: "Not authenticated" })
      return
    }

    const { title, description, date, time, location } = req.body

    // Validate input
    if (!title || !description || !date || !time || !location) {
      res.status(400).json({ success: false, message: "Please provide all required fields" })
      return
    }

    // Create event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        creatorId: userId,
      },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        attendees: true,
      },
    })

    res.status(201).json({ success: true, message: "Event created successfully", event })
  } catch (error) {
    console.error("Create event error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Update an event (only by creator)
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.userId
    const { title, description, date, time, location } = req.body

    if (!userId) {
      res.status(401).json({ success: false, message: "Not authenticated" })
      return
    }

    // Find event
    const event = await prisma.event.findUnique({ where: { id } })

    if (!event) {
      res.status(404).json({ success: false, message: "Event not found" })
      return
    }

    // Check if user is the creator
    if (event.creatorId !== userId) {
      res.status(403).json({ success: false, message: "Only creator can update this event" })
      return
    }

    // Update event
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: title || event.title,
        description: description || event.description,
        date: date ? new Date(date) : event.date,
        time: time || event.time,
        location: location || event.location,
      },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        attendees: true,
      },
    })

    res.status(200).json({ success: true, message: "Event updated successfully", event: updatedEvent })
  } catch (error) {
    console.error("Update event error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Delete an event (only by creator)
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ success: false, message: "Not authenticated" })
      return
    }

    // Find event
    const event = await prisma.event.findUnique({ where: { id } })

    if (!event) {
      res.status(404).json({ success: false, message: "Event not found" })
      return
    }

    // Check if user is the creator
    if (event.creatorId !== userId) {
      res.status(403).json({ success: false, message: "Only creator can delete this event" })
      return
    }

    // Delete event (attendees will be deleted automatically due to cascade)
    await prisma.event.delete({ where: { id } })

    res.status(200).json({ success: true, message: "Event deleted successfully" })
  } catch (error) {
    console.error("Delete event error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
