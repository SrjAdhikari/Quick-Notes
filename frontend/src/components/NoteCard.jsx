import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import formatDate from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
	// Handles deleting a note and updates state
	const handleDelete = async (e, id) => {
		e.preventDefault();

		if (!window.confirm("Are you sure you want to delete this note?")) return;

		try {
			// Delete the note by ID
			await api.delete(`notes/${id}`);

			// Update the notes state to remove the deleted note
			setNotes((prev) => prev.filter((note) => note._id !== id));

			toast.success("Note deleted successfully!");
		} catch (error) {
			console.log(`Error during deleting note: ${error}`);
			toast.error("Failed to delete a note");
		}
	};
	return (
		// Entire card is clickable and links to note detail page
		<Link
			to={`/note/${note._id}`}
			className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]"
		>
			<div className="card-body">
				{/* Note title */}
				<h3 className="card-title text-base-content">{note.title}</h3>

				{/* Note content preview (truncated to 3 lines) */}
				<p className="text-base-content/70 line-clamp-3">{note.content}</p>

				{/* Footer with date and delete icon */}
				<div className="card-actions justify-between items-center mt-4">
					{/* Created date formatted */}
					<span className="text-sm text-base-content/60">
						{formatDate(new Date(note.createdAt))}
					</span>

					{/* Action buttons (edit icon and delete button) */}
					<div className="flex items-center gap-1">
						<PenSquareIcon className="size-4" />
						<button
							className="btn btn-ghost btn-xs text-error"
							onClick={(e) => handleDelete(e, note._id)}
						>
							<Trash2Icon className="size-4 text-red-500" />
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default NoteCard;
