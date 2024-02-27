import { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateCommentMutation } from "../slices/postApiSlice";
import { editComment } from "../slices/postsSlice";
import { toast } from "react-toastify";

const EditComment = ({ comment, setEdit, postId }) => {
	const [text, setText] = useState(comment?.text);
	const dispatch = useDispatch();
	const [updateComment, { isLoading }] = useUpdateCommentMutation();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await updateComment({
				text,
				commentId: comment._id,
			}).unwrap();
			if (res) {
				dispatch(editComment({ postId, comment: res, commentId: comment._id }));
				setEdit(false);
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
				<button type="submit">Edit</button>
			</form>
		</>
	);
};
export default EditComment;
