// ✅ Import axios library to handle HTTP requests
import axios from "axios";

// ✅ Create an axios instance with a base URL
const api = axios.create({
	// 👇 Set your API base URL here
	baseURL: "http://localhost:5001/api",
});

// ✅ Export the axios instance for reuse across the app
export default api;
