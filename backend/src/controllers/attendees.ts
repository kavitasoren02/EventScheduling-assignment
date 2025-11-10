// Attendees controller - handles joining and leaving events
// Manages the RSVP system through the EventAttendee model


import type { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Join an event
export const joinEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.eventId
    const userId = req.userId // assumes middleware adds userId to req

    // Validate input
    if (!eventId) {
      res.status(400).json({ success: false, message: "Event ID is required" })
      return
    }

    if (!userId) {
      res.status(401).json({ success: false, message: "Not authenticated" })
      return
    }

    // Check if event exists
    const event = await prisma.event.findUnique({ where: { id: eventId } })
    if (!event) {
      res.status(404).json({ success: false, message: "Event not found" })
      return
    }

    // Check if user already joined
    const existingAttendee = await prisma.eventAttendee.findUnique({
      where: { userId_eventId: { userId, eventId } },
    })

    if (existingAttendee) {
      res.status(400).json({ success: false, message: "You already joined this event" })
      return
    }

    // Add user to event
    await prisma.eventAttendee.create({
      data: { userId, eventId },
    })

    res.status(201).json({ success: true, message: "Joined event successfully" })
  } catch (error) {
    console.error("Join event error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Leave an event
export const leaveEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.eventId
    const userId = req.userId

    // Validate input
    if (!eventId) {
      res.status(400).json({ success: false, message: "Event ID is required" })
      return
    }

    if (!userId) {
      res.status(401).json({ success: false, message: "Not authenticated" })
      return
    }

    // Check if user is attending the event
    const attendee = await prisma.eventAttendee.findUnique({
      where: { userId_eventId: { userId, eventId } },
    })

    if (!attendee) {
      res.status(404).json({ success: false, message: "You are not attending this event" })
      return
    }

    // Remove user from event
    await prisma.eventAttendee.delete({
      where: { userId_eventId: { userId, eventId } },
    })

    res.status(200).json({ success: true, message: "Left event successfully" })
  } catch (error) {
    console.error("Leave event error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
