// ✅ Load environment variables from .env file
import "dotenv/config";
// OR
// import dotenv from "dotenv";
// dotenv.config();

import express from "express";
import cors from "cors";

// ✅ Import path module for working with file and directory paths
import path from "path";

// ✅ Import Note routes
import noteRouter from "./routes/note.route.js";

// ✅ Import DB connection function
import connectToDatabase from "./config/db.js";

// ✅ Import rate limiter middleware
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Get the absolute path of the current directory (used for serving static files)
const __dirname = path.resolve();

// ✅ Enable Cross-Origin Resource Sharing (CORS) for all routes
if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			// ✅ Allow frontend dev server to access backend
			origin: "http://localhost:5173",
		})
	);
}

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Apply rate limiting middleware to all routes
app.use(rateLimiter);

//* ============================
//* 🚦 API Routes
//* ============================

// Note management routes
app.use("/api/notes", noteRouter);

// ✅ Serve static files in production (React build)
if (process.env.NODE_ENV === "production") {
	// ✅ Serve static files from frontend's dist directory
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	// Serve index.html for all other routes (supports React Router)
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}

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
