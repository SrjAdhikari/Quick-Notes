// ✅ Import axios library to handle HTTP requests
import axios from "axios";

// 🌐 Dynamic base URL configuration
const BASE_URL =
	import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// ✅ Create an axios instance with a base URL
const api = axios.create({
	// 👇 Set your API base URL here
	baseURL: BASE_URL,
});

// ✅ Export the axios instance for reuse across the app
export default api;
