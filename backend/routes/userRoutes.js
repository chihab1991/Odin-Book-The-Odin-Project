import express from "express";
import passport from "../config/passportConfig.js";

import {
	loginUser,
	registerUser,
	updateUser,
	getUser,
	logoutUser,
	usersToFollow,
	followers,
	following,
	sendFollowReq,
	acceptedFollowReq,
	refusedFollowReq,
	getFollowReq,
} from "../controllers/userController.js";
import {
	protectLoginRoute,
	protectRoute,
} from "../middleware/authMiddleware.js";
const router = express.Router();

// POST register new user

router.post("/", registerUser);

router.post(
	"/login",
	protectLoginRoute,
	passport.authenticate("local", { failWithError: true }),
	loginUser
);

router.get("/profile", protectRoute, getUser);
router.put("/update", protectRoute, updateUser);
router.post("/logout", protectRoute, logoutUser);

router.get("/users-to-follow", protectRoute, usersToFollow);
router.get("/followers", protectRoute, followers);
router.get("/following", protectRoute, following);
router.post("/send", protectRoute, sendFollowReq);
router.get("/follow-request", protectRoute, getFollowReq);
router.post("/accepted", protectRoute, acceptedFollowReq);
router.post("/refused", protectRoute, refusedFollowReq);

export default router;