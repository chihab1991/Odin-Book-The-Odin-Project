import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPostMutation } from "../slices/postApiSlice";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const AddNewPostScreen = () => {
	const [content, setContent] = useState("");

	const navigate = useNavigate();

	const [addPost, { isLoading }] = useAddPostMutation();
	const submitHandler = async (e) => {
		e.preventDefault();
		if (content.length < 10 || content.length > 100) {
			toast.warning("Post must be between 10 & 100 characters long.");
			return;
		}
		try {
			const res = await addPost({ content }).unwrap();
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<div className="flex min-h-screen justify-center items-center ">
			<form
				onSubmit={submitHandler}
				className="shadow-slate-500 shadow-sm px-16 py-12 rounded-md border-2 border-slate-500"
			>
				<h2 className="text-5xl font-semibold text-center mb-12">
					Add New Post
				</h2>
				<div className="mb-6">
					<textarea
						name="content"
						id="content"
						cols="40"
						rows="10"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="text-xl inline-block p-2 text-slate-900"
						placeholder="Please write your text here..."
					></textarea>
				</div>
				<div className="">
					{isLoading && (
						<div className="text-center p-4">
							<ClipLoader
								loading={isLoading}
								color={"#F8FaFC"}
								size={50}
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
						</div>
					)}
				</div>
				<div className="text-center">
					<button
						type="submit"
						className="text-center  border-white hover:text-[#646cff]"
					>
						Add Post
					</button>
				</div>
			</form>
		</div>
	);
};
export default AddNewPostScreen;
