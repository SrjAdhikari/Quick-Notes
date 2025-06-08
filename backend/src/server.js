// ✅ Load environment variables from .env file
import "dotenv/config";
// OR
// import dotenv from "dotenv";
// dotenv.config();

import express from "express";
import cors from "cors";

// ✅ Import Note routes
import noteRouter from "./routes/note.route.js";

// ✅ Import DB connection function
import connectToDatabase from "./config/db.js";

// ✅ Import rate limiter middleware
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Apply rate limiting middleware to all routes
app.use(rateLimiter);

//* ============================
//* 🚦 API Routes
//* ============================

// Note management routes
app.use("/api/notes", noteRouter);

//* ============================
//* 🚀 Server Initialization
//* ============================

const startServer = async () => {
	try {
		// 🔌 Connect to MongoDB
		await connectToDatabase();
		console.log("✅ Database connected successfully");

		// 🚀 Start the Express server
		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("❌ Failed to start server:", error.message);

		// Exit the process with failure code
		process.exit(1);
	}
};

// ✅ Start the server
startServer();
