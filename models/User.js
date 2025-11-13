import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "club", "admin"], default: "student" },
  clubName: String,
  clubDescription: String,
  profileImage: String,
  bio: String,
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Registration" }],
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcryptjs.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password)
}

export default mongoose.model("User", userSchema)
