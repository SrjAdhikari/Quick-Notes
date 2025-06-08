import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimited from "../components/RateLimited";
import api from "../lib/axios";

import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch all notes from API on component mount
	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await api.get("/notes");
				setNotes(response.data.data);
				setIsRateLimited(false);
				console.log(response.data.data);
			} catch (error) {
				console.log(`Error during fetching notes: ${error}`);

				// Check if error is due to rate limiting
				if (error.response?.status === 429) {
					setIsRateLimited(true);
				} else {
					toast.error("Failed to load notes");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchNotes();
	}, []);

	return (
		<div className="min-h-screen">
			<Navbar />

			{/* Show rate limit message if rate limited */}
			{isRateLimited && <RateLimited />}

			<div className="max-w-7xl mx-auto p-4 mt-6">
				{/* Show loading message */}
				{loading && (
					<div className="text-center text-primary py-10">Loading notes...</div>
				)}

				{/* Show "No notes found" message if no notes and not rate limited */}
				{notes.length === 0 && !isRateLimited && <NotesNotFound />}

				{/* Show notes grid if notes exist and not rate limited */}
				{notes.length > 0 && !isRateLimited && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{notes.map((note) => (
							<NoteCard key={note._id} note={note} setNotes={setNotes} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};
export default HomePage;
