// Attendees/RSVP routes
// POST /api/events/:eventId/join - Join an event (protected)
// POST /api/events/:eventId/leave - Leave an event (protected)

import { Router } from "express"
import { joinEvent, leaveEvent } from "../controllers/attendees"
import { verifyToken } from "../middleware/auth"

const router = Router({ mergeParams: true })

router.post("/join", verifyToken, joinEvent)
router.post("/leave", verifyToken, leaveEvent)

export default router
