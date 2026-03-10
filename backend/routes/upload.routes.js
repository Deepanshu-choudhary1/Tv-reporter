import express from "express"
import multer from "multer"

import { uploadImage } from "../controllers/upload.controller.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({ storage })

router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  uploadImage
)

export default router