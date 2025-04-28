import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import userRoutes from "./Routes/userRoutes.js";
import scheduleRoute from "./Routes/scheduleRoute.js";
import workoutRoutes from "./Routes/workoutRoutes.js"; // Import workout routes

const app = express();

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded payloads

// Routes
app.use("/api/users", userRoutes); // User Routes
app.use("/api/schedules", scheduleRoute); // Schedule Routes
app.use("/api/workout", workoutRoutes); // Workout Plan Routes

// Default route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Gym Management API!");
});

// Connect to MongoDB and Start Server
mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("MongoDB Connection Failed:", err));