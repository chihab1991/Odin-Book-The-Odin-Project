import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ProfileImageUpload from "../components/ProfileImageUpload";

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [edit, setEdit] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [updateProfile, { isLoading }] = useUpdateUserMutation();
	const { userInfo } = useSelector((state) => state.auth);

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
					<h2>Update Register</h2>
					<ProfileImageUpload
						name={userInfo.name}
						profilePic={userInfo.profilePic}
					/>

					<form onSubmit={submitHandler}>
						<div>
							<label htmlFor="name">Name: </label>
							<input
								type="text"
								name="name"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="email">Email: </label>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password">Password: </label>
							<input
								type="password"
								name="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="confirmPassword">Confirm Password: </label>
							<input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<div>{isLoading && <Loader />}</div>
						<button type="submit">Update</button>
					</form>
				</div>
			) : (
				<div>
					<h2>Your Profile:</h2>
					<div>
						<p>
							<b>Name:</b> {name}
						</p>
						<p>
							<b>Email:</b>
							{email}
						</p>
					</div>
					<div>
						<button onClick={handleClick}>Edit</button>
					</div>
				</div>
			)}
		</>
	);
};
export default ProfileScreen;
