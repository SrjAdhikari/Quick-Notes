import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

// Creating a root and rendering the application
createRoot(document.getElementById("root")).render(
	// StrictMode helps catch potential issues during development
	<StrictMode>
		{/* BrowserRouter provides routing context to the entire app */}
		<BrowserRouter>
			{/* Main application component */}
			<App />

			{/* Toaster component renders toast notifications globally */}
			<Toaster />
		</BrowserRouter>
	</StrictMode>
);
