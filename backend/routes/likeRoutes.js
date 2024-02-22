import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { addLike, deleteLike } from "../controllers/likeController.js";

const router = express.Router();

router.route("/").post(protectRoute, addLike).delete(protectRoute, deleteLike);

export default router;
