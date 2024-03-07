import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";

// POST add new post
const addPost = asyncHandler(async (req, res) => {
	const { content } = req.body;
	const { _id } = req.user;
	const post = await Post.create({ content, author: _id });
	if (post) {
		console.log(post);
		res.status(200).json(post);
	} else {
		res.status(501);
		throw new Error("Something went wrong. Please try again.");
	}
});

// GET get all posts
const getAllPosts = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		const posts = await Post.find({
			author: [user._id, ...user.following],
		})
			.populate("author", "name email profilePic")
			.populate({
				path: "comments",
				field: "text",
				populate: {
					path: "author",
					select: "name email profilePic",
				},
			})
			.sort({ createdAt: -1 });
		if (posts) {
			res.status(200).json(posts);
		} else {
			res.status(501);
			throw new Error("Server Error. Please try again.");
		}
		console.log(posts);
	} else {
		res.status(501);
		throw new Error("Server Error. Please try again.");
	}
});

// POST get post
const getPost = asyncHandler(async (req, res) => {
	const { postId } = req.body;
	const post = await Post.findById(postId).populate(
		"author",
		"name email profilePic"
	);
	if (post) {
		res.status(200).json(post);
	} else {
		res.status(400);
		throw new Error("Post doesn't exists!");
	}
});

// PUT modify post
const updatePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.body.postId).populate(
		"author",
		"name email profilePic"
	);

	if (post) {
		post.content = req.body.content || post.content;
		const updatedPost = await post.save();
		res.status(200).json(updatedPost);
	} else {
		res.status(401);
		throw new Error("Post does'nt exist.");
	}
});

// DELETE delete post
const deletePost = asyncHandler(async (req, res) => {
	const { postId } = req.body;
	const deletedPost = await Post.findByIdAndDelete(postId);
	if (deletedPost) {
		res.status(200).json({ message: "Post deleted successfully." });
	} else {
		res.status(404);
		throw new Error("Post doesn't exists!");
	}
});

export { addPost, getAllPosts, updatePost, getPost, deletePost };
