import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
	addPost,
	getAllPosts,
	updatePost,
	getPost,
	deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/get-post", protectRoute, getPost);
router.get("/all", protectRoute, getAllPosts);

router.post("/", protectRoute, addPost);
router.put("/", protectRoute, updatePost);
router.delete("/", protectRoute, deletePost);

export default router;
