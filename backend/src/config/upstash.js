// Rate limiting library
import { Ratelimit } from "@upstash/ratelimit";

// Redis client for storage
import { Redis } from "@upstash/redis";

// Loads environment variables
import "dotenv/config";

// Initialize the rate limiter with sliding window strategy
const ratelimit = new Ratelimit({
	// Use Redis from environment variables
	redis: Redis.fromEnv(),

	// Rate limiter allows 100 requests per minute
	limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit;
