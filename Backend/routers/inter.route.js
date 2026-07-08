import express from "express"
import multer from "multer"
import isAuth from "../middlewares/isAuth.js"
import { analyzeResume } from "../controllers/interview.controller.js"

const interRouter = express.Router()


const upload = multer({ storage: multer.memoryStorage() })

interRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume)

export default interRouter