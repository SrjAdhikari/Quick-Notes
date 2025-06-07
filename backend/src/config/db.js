import mongoose from "mongoose";

// Establishes connection to MongoDB database
const connectToDatabase = async () => {
	try {
		// Attempt database connection
		await mongoose.connect(process.env.MONGODB_URI);
	} catch (error) {
		console.error("❌ Failed to connect to MongoDB:", error.message);

		// Exit process with failure code if connection fails
		process.exit(1);
	}
};

export default connectToDatabase;
