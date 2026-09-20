import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routers/auth.route.js";
import userRouter from "./routers/user.router.js";
import interRouter from "./routers/inter.route.js";
import paymentRouter from "./routers/payment.route.js";


dotenv.config();

const app = express();
app.use(express.json())

app.use(cookieParser())

const allowedOrigins = [
    process.env.CLIENT_URL
  
].filter(Boolean);


app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}));

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", message: "AI Interviewer Backend is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interRouter);
app.use("/api/payment", paymentRouter);
app.use("/payment", paymentRouter);

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
}

export default app;