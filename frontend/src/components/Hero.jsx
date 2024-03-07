import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPostsMutation } from "../slices/postApiSlice";
import { setPosts } from "../slices/postsSlice";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Post from "./Post";
import { useEffect } from "react";

const Hero = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { posts } = useSelector((state) => state.posts);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [getAllPosts, { isLoading }] = useGetAllPostsMutation();

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, [userInfo, navigate]);
	useEffect(() => {
		const postsGetter = async () => {
			try {
				const res = await getAllPosts().unwrap();
				dispatch(setPosts([...res]));
			} catch (err) {
				toast.error(err);
			}
		};
		postsGetter();
	}, [dispatch, getAllPosts]);
	return (
		<>
			<div className="">
				{isLoading && (
					<div className="text-center pt-40">
						<ClipLoader
							loading={isLoading}
							color={"#F8FaFC"}
							size={100}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				)}
				{!isLoading && posts && (
					<>
						{posts.map((post) => (
							<Post key={post._id} post={post} userId={userInfo._id} />
						))}
					</>
				)}
				{!isLoading && posts?.length == 0 && (
					<>
						<div>
							{/* TODO modify msg  */}
							<h1 className="text-2xl text-center">
								There are no posts added by you or your friends.
							</h1>
						</div>
					</>
				)}
			</div>
		</>
	);
};
export default Hero;
