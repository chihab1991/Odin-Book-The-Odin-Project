import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

const addComment = asyncHandler(async (req, res) => {
	const [post, user] = await Promise.all([
		Post.findById(req.body.postId),
		User.findById(req.user._id),
	]);
	if (post && user) {
		const comment = await Comment.create({
			text: req.body.text,
			author: user._id,
		});
		if (comment) {
			post.comments.push(comment._id);
			const updatedPost = await post.save();
			const addedComment = await comment.populate(
				"author",
				"name email profilePic"
			);
			if (updatedPost && addedComment) {
				res.status(200).json(addedComment);
			} else {
				res.status(400);
				throw new Error("Can't add your comment. please try again.");
			}
		} else {
			res.status(400);
			throw new Error("Can't add your comment. please try again.");
		}
	} else {
		res.status(401);
		throw new Error("Invalid User or Post");
	}
});
const updateComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.body.commentId);

	comment.text = req.body.text || comment.text;
	const updatedComment = await comment.save();
	if (updatedComment) {
		res.status(200).json(updatedComment);
	} else {
		res.status(400);
		throw new Error("can't updated your comments. Please try again.");
	}
});
const deleteComment = asyncHandler(async (req, res) => {
	const [deletedComment, post] = await Promise.all([
		Comment.findByIdAndDelete(req.body.commentId),
		Post.findByIdAndUpdate(req.body.postId, {
			$pull: { comments: req.body.commentId },
		}),
	]);
	if (post && deletedComment) {
		res.status(200).json({ deletedComment, post });
	} else {
		res.status(500);
		throw new Error("can't delete comment please retry");
	}
});

export { addComment, updateComment, deleteComment };
