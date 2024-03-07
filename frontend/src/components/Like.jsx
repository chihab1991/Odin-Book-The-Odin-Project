import {
	useLikePostMutation,
	useUnlikePostMutation,
} from "../slices/postApiSlice";
import { addLike, removeLike } from "./../slices/postsSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

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
			<div className="flex">
				{likes.includes(userId) ? (
					<p className="cursor-pointer" onClick={unlikeHandler}>
						<FaHeart />
					</p>
				) : (
					<p className="cursor-pointer" onClick={likeHandler}>
						<FaRegHeart />
					</p>
				)}
				<p className="ml-4">{likes.length} likes</p>
			</div>
		</>
	);
};
export default Like;
