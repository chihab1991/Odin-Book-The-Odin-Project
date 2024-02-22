import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				dropDubs: true,
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
