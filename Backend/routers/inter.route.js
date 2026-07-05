import express from "express"
import multer from "multer"
import isAuth from "../middlewares/isAuth.js"
import { analyzeResume } from "../controllers/interview.controller.js"

const interRouter = express.Router()

// memoryStorage -> file available as req.file.buffer (no disk write, works well with pdfjs-dist)
const upload = multer({ storage: multer.memoryStorage() })

interRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume)

export default interRouter