import { useDeleteCommentMutation } from "../slices/postApiSlice";
import { removeComment } from "../slices/postsSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const DeleteComment = ({ postId, commentId }) => {
	const [deleteComment, { isLoading }] = useDeleteCommentMutation();
	const dispatch = useDispatch();

	const handleClick = async () => {
		try {
			const res = await deleteComment({ postId, commentId }).unwrap();
			if (res) {
				dispatch(removeComment({ postId, commentId }));
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<>
			<button onClick={handleClick}>Delete</button>
		</>
	);
};
export default DeleteComment;
