import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const EditPostScreen = () => {
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const { postId } = useParams();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = axios.put("/api/posts/", { postId, content });

			if (res) {
				navigate("/");
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	useEffect(() => {
		const postGetter = async () => {
			try {
				const post = await axios.post("/api/posts/get-post", { postId });
				console.log(post);
				if (post) {
					setContent(post.data.content);
					setIsLoading(false);
				}
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		};

		postGetter();
	}, [postId]);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="content">Post Content</label>
						<textarea
							name="content"
							id="content"
							cols="30"
							rows="10"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						>
							{content}
						</textarea>
					</div>
					<button type="submit">Edit</button>
				</form>
			)}
		</>
	);
};
export default EditPostScreen;
