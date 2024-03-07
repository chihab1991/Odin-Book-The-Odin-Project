import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const GuestLogin = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	const { userInfo } = useSelector((state) => state.auth);
	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const clickHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({
				email: "guest@gmail.com",
				password: "0123123s",
			}).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<>
			<button
				onClick={clickHandler}
				className="bg-inherit border-white hover:text-[#646cff]"
			>
				Login as Guest
			</button>
			{isLoading && (
				<div className="text-center pt-32">
					<ClipLoader
						loading={isLoading}
						color={"#F8FaFC"}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			)}
		</>
	);
};
export default GuestLogin;
