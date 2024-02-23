import { useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../slices/postApiSlice";
import { toast } from "react-toastify";
import { removePost } from "../slices/postsSlice";
import { useDispatch } from "react-redux";
import Like from "./Like";

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
				<div>
					{post?.author._id === userId && (
						<div>
							<button onClick={editHandler}>Edit</button>
							<button onClick={deleteHandler}>Delete</button>
						</div>
					)}
					{isLoading && <Post />}
					<h2>{post?.author.name}</h2>
					<p>{post?.content}</p>
					<p>date: {post?.createdAt}</p>
					<Like likes={post?.likes} userId={userId} postId={post?._id} />
					<div>
						<h4>Comment:</h4>
						{post?.comments?.map((comment) => {
							<Comment key={comment._id} comment={comment} />;
						})}
					</div>
				</div>
			)}
		</>
	);
};
export default Post;
