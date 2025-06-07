import Note from "../models/note.model.js";

//* ====================================
//* ✅ CONTROLLER TO FETCH ALL NOTES
//* ====================================

export const getAllNotes = async (req, res) => {
	try {
		// Fetch all notes, sorted by newest first
		const notes = await Note.find().sort({ createdAt: -1 });

		// Send successful response with notes data
		res.status(200).json({
			success: true,
			data: notes,
		});
	} catch (error) {
		console.log(`Error occured in getAllNotes controller: ${error.message}`);

		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

//* ====================================
//* ✅ CONTROLLER TO FETCH SINGLE NOTE
//* ====================================

export const getNoteById = async (req, res) => {
	try {
		const noteId = req.params.id;

		// Find note by ID
		const note = await Note.findById(noteId);

		// Handle case where note isn't found
		if (!note) {
			return res.status(404).json({
				success: false,
				message: "Note not found",
			});
		}

		// Send successful response with note data
		res.status(200).json({
			success: true,
			data: note,
		});
	} catch (error) {
		console.log(`Error occured in getNoteById controller: ${error.message}`);

		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

//* ====================================
//* ✅ CONTROLLER TO CREATE NEW NOTE
//* ====================================

export const createNote = async (req, res) => {
	try {
		const { title, content } = req.body;

		// Validate required fields
		if (!title || !content) {
			return res.status(400).json({
				success: false,
				message: "Both title and content are required",
			});
		}

		// Create and save a new note
		const newNote = await Note.create({
			title,
			content,
		});

		// Send successful response with new note data
		res.status(201).json({
			success: true,
			message: "Note created successfully",
			data: newNote,
		});
	} catch (error) {
		console.log(`Error occured in createNote controller: ${error.message}`);

		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

//* ====================================
//* ✅ CONTROLLER TO UPDATE NOTE
//* ====================================

export const updateNote = async (req, res) => {
	try {
		const { title, content } = req.body;
		const noteId = req.params.id;

		// Find and update the note by ID with new title and/or content
		const updatedNote = await Note.findByIdAndUpdate(
			noteId,
			{
				title,
				content,
			},
			{
				runValidators: true, // Run schema validators on update
				new: true, // Return the updated document
			}
		);

		// Handle note not found
		if (!updatedNote) {
			return res.status(404).json({
				success: false,
				message: "Note not found",
			});
		}

		// Send success response with updated note data
		res.status(200).json({
			success: true,
			message: "Note updated successfully",
			data: updatedNote,
		});
	} catch (error) {
		console.log(`Error occured in updateNote controller: ${error.message}`);

		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

//* ====================================
//* ✅ CONTROLLER TO DELETE NOTE
//* ====================================

export const deleteNote = async (req, res) => {
	try {
		const noteId = req.params.id;

		// Find and delete the note by ID
		const deletedNote = await Note.findByIdAndDelete(noteId);

		// Handle note not found
		if (!deletedNote) {
			return res.status(404).json({
				success: false,
				message: "No note found with that ID",
			});
		}

		// Send successful response with deleted note data
		res.status(200).json({
			success: true,
			message: "Note deleted successfully",
			data: deletedNote,
		});
	} catch (error) {
		console.log(`Error occured in deleteNote controller: ${error.message}`);

		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};
