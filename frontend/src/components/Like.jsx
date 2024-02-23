import {
	useLikePostMutation,
	useUnlikePostMutation,
} from "../slices/postApiSlice";
import { addLike, removeLike } from "./../slices/postsSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Like = ({ likes, userId, postId }) => {
	const dispatch = useDispatch();

	const [likePost] = useLikePostMutation();
	const [unlikePost] = useUnlikePostMutation();

	const likeHandler = async () => {
		try {
			const res = await likePost({ postId }).unwrap();
			if (res) {
				dispatch(addLike({ userId, postId }));
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	const unlikeHandler = async () => {
		try {
			const res = await unlikePost({ postId }).unwrap();
			if (res) {
				dispatch(removeLike({ userId, postId }));
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			{likes.includes(userId) ? (
				<p onClick={unlikeHandler}>unlike</p>
			) : (
				<p onClick={likeHandler}>like</p>
			)}
			<p>{likes.length} likes</p>
		</>
	);
};
export default Like;
