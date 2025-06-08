import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
	const [note, setNote] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();
	console.log({ id });

	// Fetch note details on component mount and when 'id' changes
	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await api.get(`/notes/${id}`);
				setNote(response.data.data);
			} catch (error) {
				console.log(`Error during fetching note: ${error}`);
				toast.error("Failed to fetch the note");
			} finally {
				setLoading(false);
			}
		};

		fetchNotes();
	}, [id]);

	// Handle note deletion with confirmation
	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this note?")) return;

		try {
			await api.delete(`/notes/${id}`);
			toast.success("Note deleted successfully!");
			navigate("/");
		} catch (error) {
			console.log(`Error during deleting note: ${error}`);
			toast.error("Failed to delete note");
		}
	};

	// Handle note update/save
	const handleSave = async () => {
		if (!note.title.trim() || !note.content.trim()) {
			toast.error("Please provide both title and content");
			return;
		}

		setSaving(true);

		try {
			await api.put(`/notes/${id}`, note);
			toast.success("Note updated successfully");
			navigate("/");
		} catch (error) {
			console.log(`Error during updating note: ${error}`);
			toast.error("Failed to update note");
		} finally {
			setSaving(false);
		}
	};

	// Show loading spinner while fetching note data
	if (loading) {
		return (
			<div className="min-h-screen bg-base-200 flex items-center justify-center">
				<LoaderIcon className="animate-spin size-10" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<Link to="/" className="btn btn-ghost">
							<ArrowLeftIcon className="size-5" />
						</Link>

						<button
							onClick={handleDelete}
							className="btn btn-error btn-outline"
						>
							<Trash2Icon className="size-5" />
							Delete Note
						</button>
					</div>

					{/* Note editing form */}
					<div className="card bg-base-100">
						<div className="card-body">
							<div className="form-control mb-4">
								<label htmlFor="title" className="label">
									<span className="label-text">Title</span>
								</label>
								<input
									type="text"
									name="title"
									id="title"
									className="input input-bordered"
									placeholder="Enter note title"
									value={note.title}
									onChange={(e) => setNote({ ...note, title: e.target.value })}
								/>
							</div>

							<div className="form-control mb-4">
								<label htmlFor="content" className="label">
									<span className="label-text">Content</span>
								</label>
								<textarea
									name="content"
									id="content"
									className="textarea textarea-bordered h-32"
									placeholder="Write your note here..."
									value={note.content}
									onChange={(e) =>
										setNote({ ...note, content: e.target.value })
									}
								/>
							</div>

							{/* Save button */}
							<div className="card-actions justify-end">
								<button
									className="btn btn-primary"
									disabled={saving}
									onClick={handleSave}
								>
									{saving ? "Saving..." : "Save Changes"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default NoteDetailPage;
