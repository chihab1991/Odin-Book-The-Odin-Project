import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPostsMutation } from "../slices/postApiSlice";
import { setPosts } from "../slices/postsSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
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
	}, []);
	return (
		<>
			{isLoading && <Loader />}
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
						<h1>take it</h1>
					</div>
				</>
			)}
		</>
	);
};
export default Hero;
