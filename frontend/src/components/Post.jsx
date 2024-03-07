import { useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../slices/postApiSlice";
import { toast } from "react-toastify";
import { removePost } from "../slices/postsSlice";
import { useDispatch } from "react-redux";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import TimeAgo from "timeago-react";
import Like from "./Like";
import AddComment from "./AddComment";
import Comment from "./Comment";

const Post = ({ post, userId }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [deletePost, { isLoading }] = useDeletePostMutation();
	const editHandler = () => {
		navigate(`/edit/${post._id}`);
	};

	const deleteHandler = async () => {
		try {
			const res = await deletePost({ postId: post._id }).unwrap();
			if (res) {
				dispatch(removePost(post._id));
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			{post && (
				<div className="pt-4 px-4">
					<div className="flex justify-between items-center">
						<div className="flex justify-between items-center">
							<img
								src={post?.author?.profilePic}
								alt={post?.author?.name}
								className="rounded-full size-8 mr-4"
							/>
							<h2 className=" mr-4 font-bold">{post?.author?.name}</h2>
							<p className="text-sm">
								<TimeAgo datetime={post?.createdAt} />
							</p>
						</div>

						{post?.author?._id === userId && (
							<div className="flex justify-between items-center">
								<button
									onClick={editHandler}
									className="mr-4 p-2 rounded-full border-slate-50"
								>
									<FaPen />
								</button>
								<button
									onClick={deleteHandler}
									className="p-2 rounded-full border-slate-50"
								>
									<FaTrash />
								</button>
							</div>
						)}
					</div>
					<p className="my-4 text-3xl">{post?.content}</p>
					<Like likes={post?.likes} userId={userId} postId={post?._id} />
					<div>
						<h4 className="my-4 text-xl font-semibold">Comments:</h4>
						{post?.comments?.map((comment) => {
							return (
								<Comment
									key={comment._id}
									comment={comment}
									postId={post?._id}
									authorId={post?.author?._id}
								/>
							);
						})}
						<AddComment postId={post?._id} />
					</div>
					<hr className="my-4 " />
				</div>
			)}
		</>
	);
};
export default Post;
