// Event routes
// GET /api/events - Get all events
// GET /api/events/:id - Get event by ID
// POST /api/events - Create event (protected)
// PUT /api/events/:id - Update event (protected)
// DELETE /api/events/:id - Delete event (protected)

import { Router } from "express"
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from "../controllers/event"
import { verifyToken, optionalVerifyToken } from "../middleware/auth"

const router = Router()

router.get("/", optionalVerifyToken, getAllEvents)
router.get("/:id", optionalVerifyToken, getEventById)
router.post("/", verifyToken, createEvent)
router.put("/:id", verifyToken, updateEvent)
router.delete("/:id", verifyToken, deleteEvent)

export default router
