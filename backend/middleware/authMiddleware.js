export const protectRoute = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401);
		throw new Error("User not authenticated.");
	}
};

export const protectLoginRoute = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	} else {
		res.status(401);
		throw new Error("You are already logged in.");
	}
};
