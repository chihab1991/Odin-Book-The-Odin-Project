import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { defaultImg } from "../config/constantes.js";

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(401);
		throw new Error("Email already exist.");
	}
	const user = await User.create({
		name,
		email,
		password,
		profilePic: defaultImg,
	});
	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			profilePic: user.profilePic,
		});
	} else {
		res.status(401);
		throw new Error("Server error. Please try again.");
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { _id, name, email, profilePic } = req.user;
	res.status(200).json({ _id, name, email, profilePic });
});
const getUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.body._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			profilePic: updatedUser.profilePic,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user info.");
	}
});

const logoutUser = asyncHandler(async (req, res) => {
	req.logout((err) => {
		if (err) {
			res.status(400);
			throw new Error(err);
		}
		res.status(200).json({ message: "User logged out" });
	});
});

const checkUser = asyncHandler(async (req, res) => {
	console.log(req.user);
	if (req.user) {
		const { _id, name, email, profilePic } = req.user;
		res.status(200).json({ _id, name, email, profilePic });
	} else {
		res.status(501).json(null);
	}
});

const usersToFollow = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const users = await User.find({
			$and: [{ _id: { $nin: user.following } }, { _id: { $ne: user._id } }],
		}).select("email name profilePic");

		if (users) {
			res.status(200).json(users);
		} else {
			res.status(500);
			throw new Error("Server Error. Please try again.");
		}
	} else {
		res.status(500);
		throw new Error("Server Error. Please try again.");
	}
});

const followers = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const users = await User.find({ _id: { $in: user.followers } }).select(
			"email name profilePic"
		);

		if (users) {
			res.status(200).json(users);
		} else {
			res.status(500);
			throw new Error("Server Error. Please try again.");
		}
	} else {
		res.status(500);
		throw new Error("Server Error. Please try again.");
	}
});

const following = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const users = await User.find({
			$and: [{ _id: { $in: user.following } }, { _id: { $ne: user._id } }],
		}).select("email name profilePic");

		if (users) {
			res.status(200).json(users);
		} else {
			res.status(500);
			throw new Error("Server Error. Please try again.");
		}
	} else {
		res.status(500);
		throw new Error("Server Error. Please try again.");
	}
});
const sendFollowReq = asyncHandler(async (req, res) => {
	const [sender, receiver] = await Promise.all([
		User.findById(req.user._id),
		User.findById(req.body.receiverId),
	]);
	if (sender && receiver) {
		sender.followReqSent.push(receiver._id);
		const senderAdded = await sender.save();
		if (!senderAdded) {
			res.status(500);
			throw new Error("Server Error, Please try again.");
		}
		receiver.followReqReceived.push(sender._id);
		const receiverAdded = await receiver.save();
		if (receiverAdded) {
			res.status(200).json({ senderAdded, receiverAdded });
		} else {
			res.status(500);
			throw new Error("Server Error, Please try again.");
		}
	} else {
		res.status(500);
		throw new Error("Server Error, Please try again.");
	}
});

const getFollowReq = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		res.status(501);
		throw new Error("Unauthorized .Please authenticate");
	}

	const followRequests = await User.find({
		_id: { $in: user.followReqReceived },
	}).select("name email profilePic");

	if (followRequests) {
		res.status(200).json(followRequests);
	} else {
		res.status(500);
		throw new Error("No follow request received.");
	}
});

const acceptedFollowReq = asyncHandler(async (req, res) => {
	const [sender, receiver] = await Promise.all([
		User.findById(req.body.senderId),
		User.findById(req.user._id),
	]);
	if (sender && receiver) {
		await sender.followReqSent.pull(receiver._id);
		await sender.following.push(receiver._id);
		const followingAdded = await sender.save();
		if (followingAdded) {
			await receiver.followReqReceived.pull(sender._id);
			await receiver.followers.push(sender._id);
			const followerAdded = await receiver.save();
			if (followerAdded) {
				res.status(200).json([followingAdded, followerAdded]);
			} else {
				res.status(500);
				throw new Error("Server Error, Please try again.");
			}
		} else {
			res.status(500);
			throw new Error("Server Error, Please try again.");
		}
	} else {
		res.status(500);
		throw new Error("Server Error, Please try again.");
	}
});
const refusedFollowReq = asyncHandler(async (req, res) => {
	const [sender, receiver] = await Promise.all([
		User.findById(req.body.senderId),
		User.findById(req.user._id),
	]);

	if (sender && receiver) {
		await sender.followReqSent.pull(receiver._id);

		const followingRefused = await sender.save();
		if (followingRefused) {
			await receiver.followReqReceived.pull(sender._id);
			const followerRefused = await receiver.save();
			if (followerRefused) {
				res.status(200).json([followingRefused, followerRefused]);
			} else {
				res.status(500);
				throw new Error("Server Error, Please try again.");
			}
		} else {
			res.status(500);
			throw new Error("Server Error, Please try again.");
		}
	} else {
		res.status(500);
		throw new Error("Server Error, Please try again.");
	}
});
const updateProfilePic = asyncHandler(async (req, res) => {
	const imageUrl = req.body.imageUrl;
	console.log(imageUrl);
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ profilePic: imageUrl }
	);
	if (user) {
		const updatedProfile = await User.findOne({ _id: req.user._id });
		if (updatedProfile) {
			console.log({ profilePic: updatedProfile.profilePic });
			res.status(200).json({ profilePic: updatedProfile.profilePic });
		} else {
			res.status(500);
			throw new Error("Server error. Please try again.");
		}
	}
});
const deleteProfilePic = asyncHandler(async (req, res) => {
	const deletedProfilePic = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ profilePic: defaultImg }
	);
	if (deletedProfilePic) {
		const updatedProfile = await User.findOne({ _id: req.user._id });
		if (updatedProfile) {
			res.status(200).json({ profilePic: updatedProfile.profilePic });
		} else {
			res.status(500);
			throw new Error("Server error. Please try again.");
		}
	}
});
export {
	registerUser,
	loginUser,
	getUser,
	updateUser,
	logoutUser,
	checkUser,
	usersToFollow,
	followers,
	following,
	sendFollowReq,
	acceptedFollowReq,
	refusedFollowReq,
	getFollowReq,
	updateProfilePic,
	deleteProfilePic,
};
