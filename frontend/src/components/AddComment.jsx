import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAddCommentMutation } from "../slices/postApiSlice";
import { newComment } from "../slices/postsSlice";
import { toast } from "react-toastify";

const AddComment = ({ postId }) => {
	const [text, setText] = useState("");

	const [addComment, { isLoading }] = useAddCommentMutation();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await addComment({ text, postId }).unwrap();
			if (res) {
				dispatch(newComment({ postId, comment: res }));
				setText("");
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="commentText"></label>
					<input
						type="text"
						name="commentText"
						id="commentText"
						placeholder="Add a comment..."
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<button type="submit">Add</button>
			</form>
		</>
	);
};
export default AddComment;
