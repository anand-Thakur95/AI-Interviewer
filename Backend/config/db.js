import mongoose from "mongoose";
import dns from "dns";

// Force Google's public DNS — fixes SRV lookup failures on some local networks/ISPs (Windows-common issue)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        isConnected = conn.connections[0].readyState === 1;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB;