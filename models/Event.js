import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  category: { type: String, enum: ["conference", "workshop", "social", "sports", "cultural"], required: true },
  date: { type: Date, required: true },
  time: String,
  location: String,
  latitude: Number,
  longitude: Number,
  capacity: Number,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Registration" }],
  status: { type: String, enum: ["draft", "published", "cancelled"], default: "draft" },
  registrationCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("Event", eventSchema)
