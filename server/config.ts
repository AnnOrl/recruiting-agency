const config = {
	redisStore: {
		url: process.env.REDIS_STORE_URI,
		secret: process.env.REDIS_STORE_SECRET
	}
};

export { config };
