import express from "express";
import {
	addComment,
	updateComment,
	deleteComment,
} from "../controllers/commentController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectRoute, addComment);
router.put("/", protectRoute, updateComment);
router.delete("/", protectRoute, deleteComment);

export default router;
