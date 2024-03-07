import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAddCommentMutation } from "../slices/postApiSlice";
import { newComment } from "../slices/postsSlice";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";

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
			<form onSubmit={handleSubmit} className="flex mt-4">
				<input
					type="text"
					name="commentText"
					id="commentText"
					placeholder="Add a comment..."
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="grow text-slate-900 text-base px-4 py-2 rounded "
				/>

				<button type="submit" className="p-2 border-slate-50 rounded-none">
					<FaPlus />
				</button>
			</form>
		</>
	);
};
export default AddComment;
