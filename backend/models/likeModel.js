import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like;