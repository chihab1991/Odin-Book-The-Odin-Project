const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	if (err.name === "CastError" && err.kind === "ObjectId") {
		statusCode = 404;
		message = "Resource not found";
	}
	if (err.message === "Unauthorized") {
		statusCode = 401;
		message = "Invalid email or password";
		// return res.status(401).json({ error: err.message });
	}
	res.status(statusCode).json({
		message: message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { notFound, errorHandler };
