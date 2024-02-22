const Comment = ({ comment }) => {
	return (
		<>
			<div>
				<h3>{comment.author.name}</h3>
				<p>{comment.text}</p>
			</div>
		</>
	);
};
export default Comment;
