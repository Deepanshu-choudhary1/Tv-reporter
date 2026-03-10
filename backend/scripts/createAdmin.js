import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

import User from "../models/User.js"
import connectDB from "../config/db.js"

dotenv.config()

const createAdmin = async ()=>{

  await connectDB()

  const password = await bcrypt.hash("admin123",10)

  const admin = new User({

    email:"admin@tvreporter.com",

    password

  })

  await admin.save()

  console.log("Admin created")

  process.exit()

}

createAdmin()