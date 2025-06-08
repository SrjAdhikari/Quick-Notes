import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the schema for a Note
const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		content: {
			type: String,
			required: [true, "Content is required"],
		},
	},
	// Automatically add createdAt and updatedAt timestamps
	{ timestamps: true }
);

// Create and export the Note model
const Note = mongoose.model("Note", noteSchema);

export default Note;
