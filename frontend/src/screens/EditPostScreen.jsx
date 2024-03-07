import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

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
				<div className="text-center pt-32">
					<ClipLoader
						loading={isLoading}
						color={"#F8FaFC"}
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<div className="flex min-h-screen justify-center items-center ">
					<form
						onSubmit={handleSubmit}
						className="shadow-slate-500 shadow-sm px-16 py-12 rounded-md border-2 border-slate-500"
					>
						<h2 className="text-5xl font-semibold text-center mb-12">
							Edit Post
						</h2>
						<textarea
							name="content"
							id="content"
							cols="40"
							rows="10"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="text-xl inline-block p-4 text-slate-900 rounded-md"
							placeholder="Please write your text here..."
						></textarea>
						<div className="text-center mt-4">
							<button
								type="submit"
								className="text-center  border-white hover:text-[#646cff]"
							>
								Edit
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
};
export default EditPostScreen;
