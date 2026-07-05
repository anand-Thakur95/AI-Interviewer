import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routers/auth.route.js";
import userRouter from "./routers/user.router.js";
import interRouter from "./routers/inter.route.js";


dotenv.config();

const app = express();
app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter)

app.use("/api/user", userRouter)

app.use("/api/interview", interRouter)

const PORT  = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    connectDB();
    console.log(`server is running on port ${PORT}`)
})