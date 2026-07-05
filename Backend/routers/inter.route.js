import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { analyzeResume } from "../controllers/interview.controller.js"


const interRouter = express.Router()

interRouter.post("/resume", isAuth, XMLHttpRequestUpload.single("resume"),
analyzeResume)

export default interRouter