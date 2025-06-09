import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
	return (
		<div className="relative h-full w-full">
			<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00ff9d30_100%)]" />

			{/* Application routes configuration */}
			<Routes>
				{/* Home route - renders when path exactly matches "/" */}
				<Route path="/" element={<HomePage />} />

				{/* Create note route - renders when path matches "/create" */}
				<Route path="/create" element={<CreateNotePage />} />

				{/* Dynamic note detail route - ":id" is a URL parameter */}
				<Route path="/note/:id" element={<NoteDetailPage />} />
			</Routes>
		</div>
	);
};
export default App;
