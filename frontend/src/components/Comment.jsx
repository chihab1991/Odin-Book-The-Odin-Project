import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";
import { FaPen } from "react-icons/fa6";

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
					<div className="flex justify-between items-center">
						<div className="flex items-center font-semibold">
							<img
								src={comment?.author?.profilePic}
								alt={comment?.author?.name}
								className="size-6 mr-3 rounded-full"
							/>
							<h3>{comment?.author?.name}</h3>
						</div>
						{userInfo._id === comment?.author?._id ||
						userInfo._id === authorId ? (
							<div>
								<button
									onClick={handleClick}
									className="mr-4 p-2 rounded-full border-slate-50"
								>
									<FaPen />
								</button>
								<DeleteComment postId={postId} commentId={comment._id} />
							</div>
						) : (
							<></>
						)}
					</div>
					<p className="text-2xl">{comment?.text}</p>
				</div>
			)}
		</>
	);
};
export default Comment;
