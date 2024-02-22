import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPostMutation } from "../slices/postApiSlice";
import { toast } from "react-toastify";
const AddNewPostScreen = () => {
	const [content, setContent] = useState("");

	const navigate = useNavigate();

	const [addPost, { isLoading }] = useAddPostMutation();
	const submitHandler = async (e) => {
		e.preventDefault();
		if (content.length < 10 || content.length > 100) {
			toast.warning("Post must be between 10 & 100 characters long.");
			return;
		}
		try {
			const res = await addPost({ content }).unwrap();
			console.log(res);
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<>
			<h2>Add New Post</h2>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="content">Post Content</label>
					<textarea
						name="content"
						id="content"
						cols="30"
						rows="10"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></textarea>
				</div>
				<button type="submit">Add Post</button>
				{isLoading && <p>Adding your post. please wait!!</p>}
			</form>
		</>
	);
};
export default AddNewPostScreen;
