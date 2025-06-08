// Import Express Router to define modular route handlers
import { Router } from "express";

// Import controller functions for handling note logic
import {
	createNote,
	deleteNote,
	getAllNotes,
	getNoteById,
	updateNote,
} from "../controllers/note.controller.js";

//* ==========================================
//* 🔐 NOTE ROUTER - HANDLES NOTE ENDPOINTS
//* ✅ BASE ROUTE : /api/notes
//* ==========================================

// Create a new instance of the Express Router
const noteRouter = Router();

// ✅ Route to get all notes
noteRouter.get("/", getAllNotes);

// ✅ Route to get a specific note by ID
noteRouter.get("/:id", getNoteById);

// ✅ Route to create a new note
noteRouter.post("/", createNote);

// ✅ Route to update an existing note by ID
noteRouter.put("/:id", updateNote);

// ✅ Route to delete a note by ID
noteRouter.delete("/:id", deleteNote);

// ✅ Export the router
export default noteRouter;
