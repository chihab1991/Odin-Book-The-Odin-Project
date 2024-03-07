import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import ProfileImageUpload from "../components/ProfileImageUpload";
import Post from "../components/Post";

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [edit, setEdit] = useState(false);

	const dispatch = useDispatch();

	const [updateProfile, { isLoading }] = useUpdateUserMutation();
	const { userInfo } = useSelector((state) => state.auth);
	const { posts } = useSelector((state) => state.posts);

	useEffect(() => {
		setName(userInfo.name);
		setEmail(userInfo.email);
	}, [userInfo.name, userInfo.email]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Password do not match.");
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					name,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("Profile updated");
				setEdit(false);
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};
	const handleClick = () => {
		setEdit(true);
	};
	return (
		<>
			{edit ? (
				<div>
					<h2 className="text-5xl font-semibold text-center mb-12">
						Update Profile
					</h2>
					<ProfileImageUpload
						name={userInfo.name}
						profilePic={userInfo.profilePic}
					/>

					<form
						onSubmit={submitHandler}
						className="shadow-slate-500 shadow-sm px-8 py-10 rounded-md border-2 border-slate-500"
					>
						<div className="mb-6">
							<label
								htmlFor="name"
								className="inline-block text-2xl mr-4 mb-3 w-56"
							>
								Name:
							</label>
							<input
								type="text"
								name="name"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="text-xl inline-block p-2 text-slate-900 w-full"
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="email"
								className="inline-block text-2xl mr-4 w-56  mb-3"
							>
								Email:
							</label>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="text-xl inline-block p-2 text-slate-900 w-full"
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="password"
								className="inline-block text-2xl mr-4 w-56  mb-3"
							>
								Password:
							</label>
							<input
								type="password"
								name="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="text-xl inline-block p-2 text-slate-900 w-full"
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="confirmPassword"
								className="inline-block text-2xl mr-4 w-56  mb-3"
							>
								Confirm Password:
							</label>
							<input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="text-xl inline-block p-2 text-slate-900 w-full"
							/>
						</div>
						<div>
							{isLoading && (
								<div className="text-center pt-32">
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
						<button
							type="submit"
							className="border-slate-500 border hover:text-[#646cff]"
						>
							Update
						</button>
					</form>
				</div>
			) : (
				<>
					<div>
						<h2 className="text-4xl font-bold mb-4">Your Profile:</h2>
						<div className="flex  justify-between">
							<div>
								<p className="mb-4 text-2xl">
									<b>Name: </b> {name}
								</p>
								<p className="mb-4 text-2xl">
									<b>Email: </b>
									{email}
								</p>
							</div>
							<div>
								<button
									onClick={handleClick}
									className="border-slate-500 border hover:text-[#646cff]"
								>
									Edit
								</button>
							</div>
						</div>
					</div>
					<div>
						<h2 className="text-4xl font-bold my-4">Your Posts:</h2>
						{posts &&
							posts.map((post) => {
								if (post.author._id === userInfo._id) {
									return (
										<Post key={post._id} post={post} userId={userInfo._id} />
									);
								}
							})}
					</div>
				</>
			)}
		</>
	);
};
export default ProfileScreen;
