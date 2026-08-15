import express from "express"
import multer from "multer"
import isAuth from "../middlewares/isAuth.js"
import { analyzeResume, finishInterview, generateQuestion, getInterview, getInterviewReport, submitAnswer} from "../controllers/interview.controller.js"

const interRouter = express.Router()


const upload = multer({ storage: multer.memoryStorage() })

interRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume)
interRouter.post("/generate-questions", isAuth, generateQuestion)
interRouter.post("/submit-answer", isAuth, submitAnswer)
interRouter.post("/finish",isAuth, finishInterview)


interRouter.get("/get-interview", isAuth, getInterview)
interRouter.get("/report/:id", isAuth, getInterviewReport)




export default interRouter