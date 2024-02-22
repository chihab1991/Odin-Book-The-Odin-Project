import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		followers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				dropDubs: true,
			},
		],
		following: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				dropDubs: true,
			},
		],
		followReqReceived: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				dropDubs: true,
			},
		],
		followReqSent: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				dropDubs: true,
			},
		],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.checkPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
