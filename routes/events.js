import express from "express"
import Event from "../models/Event.js"
import Registration from "../models/Registration.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Get all published events
router.get("/", async (req, res) => {
  try {
    const { category, search, sortBy } = req.query
    const query = { status: "published" }

    if (category) query.category = category
    if (search) {
      query.$or = [{ title: new RegExp(search, "i") }, { description: new RegExp(search, "i") }]
    }

    const events = await Event.find(query)
      .populate("organizer", "firstname lastname clubName")
      .sort({ date: 1 })
      .limit(50)

    res.json(events)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "firstname lastname clubName email")
      .populate({
        path: "registrations",
        populate: { path: "user", select: "firstname lastname email" },
      })

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, date, time, location, capacity, image } = req.body

    const event = new Event({
      title,
      description,
      category,
      date,
      time,
      location,
      capacity,
      image,
      organizer: req.userId,
      status: "published",
    })

    await event.save()
    await event.populate("organizer", "firstname lastname clubName")

    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Register for event
router.post("/:id/register", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    const existingRegistration = await Registration.findOne({
      user: req.userId,
      event: req.params.id,
    })

    if (existingRegistration) {
      return res.status(400).json({ message: "Already registered" })
    }

    const registration = new Registration({
      user: req.userId,
      event: req.params.id,
    })

    await registration.save()
    event.registrations.push(registration._id)
    event.registrationCount += 1
    await event.save()

    res.status(201).json({ message: "Registered successfully", registration })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// Publish event (club only)
router.patch("/:id/publish", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Vérifier que le club connecté est bien l'organisateur
    if (event.organizer.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to publish this event" })
    }

    event.status = "published"
    await event.save()

    res.json({ message: "Event published successfully", event })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// Update event
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: "Event not found" })

    // Vérifie que seul l'organisateur peut modifier
    if (event.organizer.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" })
    }

    // Met à jour seulement les champs fournis
    Object.keys(req.body).forEach((key) => {
      event[key] = req.body[key]
    })

    await event.save()
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Delete event (club only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Only the club who created the event can delete it
    if (event.organizer.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this event" })
    }

    await Event.findByIdAndDelete(req.params.id)
    res.json({ message: "Event deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
