import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";


dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        const MONGO_URL = process.env.MONGO_URL;
        if (!MONGO_URL) {
            throw new Error("Missing MONGO_URL in .env");
        }
        await mongoose.connect(MONGO_URL);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

export default connectDB;