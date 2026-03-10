import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.json({ token })
}