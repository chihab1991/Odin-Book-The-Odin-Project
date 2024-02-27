import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

const Comment = ({ comment, postId, authorId }) => {
	const [edit, setEdit] = useState(false);
	const { userInfo } = useSelector((state) => state.auth);

	const handleClick = () => {
		setEdit(true);
	};

	return (
		<>
			{edit ? (
				<EditComment setEdit={setEdit} comment={comment} postId={postId} />
			) : (
				<div>
					<h3>{comment?.author?.name}</h3>
					<p>{comment?.text}</p>
					<p>1</p>
					{userInfo._id === comment?.author?._id ||
					userInfo._id === authorId ? (
						<div>
							<button onClick={handleClick}>Edit</button>
							<DeleteComment postId={postId} commentId={comment._id} />
						</div>
					) : (
						<></>
					)}
				</div>
			)}
		</>
	);
};
export default Comment;
