import express from "express"
import User from "../models/User.js"
import Registration from "../models/Registration.js"

const router = express.Router()

// Get user profile
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("registrations").populate("createdEvents")

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get user registrations
router.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.userId }).populate("event")

    res.json(registrations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
