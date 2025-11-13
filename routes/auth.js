import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" },
  )
}

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, role, clubName } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const user = new User({
      firstname,
      lastname,
      email,
      password,
      role: role || "student",
      clubName: role === "club" ? clubName : undefined,
    })

    await user.save()

    const token = generateToken(user)
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        clubName: user.clubName,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
