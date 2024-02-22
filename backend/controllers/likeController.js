import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

const addLike = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.body.postId);
	const userId = req.user._id;
	if (post && userId) {
		post.likes.push(userId);
		const updatedPost = await post.save();
		if (updatedPost) {
			res.status(200).json({ message: "like added to your post" });
		} else {
			res.status(401);
			throw new Error("Could't add your like.");
		}
	} else {
		res.status(401);
		throw new Error("Could't add your like.");
	}
});

const deleteLike = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.body.postId);
	const userId = req.user._id;
	if (userId && post) {
		const updatedPost = await Post.findByIdAndUpdate(req.body.postId, {
			$pull: { likes: userId },
		});
		if (updatedPost) {
			res.status(200).json({ message: "like deleted" });
		} else {
			res.status(401);
			throw new Error("Could't add your like.");
		}
	} else {
		res.status(401);
		throw new Error("Could't add your like.");
	}
});

export { addLike, deleteLike };
