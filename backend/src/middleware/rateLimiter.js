import ratelimit from "../config/upstash.js";

// ✅ Rate Limiting Middleware using Upstash Redis
const rateLimiter = async (req, res, next) => {
	try {
		// Apply rate limit logic with a fixed identifier
		const { success } = await ratelimit.limit("my-rate-limit");

		// If rate limit exceeded, return 429 Too Many Requests
		if (!success) {
			return res.status(429).json({
				success: false,
				message: "Too many requests. Please try again later.",
			});
		}

		// Proceed to next middleware if limit not exceeded
		next();
	} catch (error) {
		// Log error and pass it to global error handler
		console.error(`Error occurred in rateLimiter middleware: ${error.message}`);
		next(error);
	}
};

export default rateLimiter;
