import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import GuestLogin from "../components/GuestLogin";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<div className="flex min-h-screen justify-center items-center ">
			<form
				onSubmit={submitHandler}
				className="shadow-slate-500 shadow-sm px-8 py-10 rounded-md border-2 border-slate-500"
			>
				<h2 className="text-5xl font-semibold text-center mb-12">Login</h2>
				<div className="mb-6">
					<label htmlFor="email" className="inline-block text-2xl mr-4 w-28">
						Email:
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="text-xl inline-block p-2 text-slate-900 w-80"
					/>
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="inline-block text-2xl mr-4 w-28">
						Password:
					</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="text-xl inline-block p-2 text-slate-900 w-80"
					/>
				</div>
				{isLoading && (
					<div className="text-center p-8">
						<ClipLoader
							loading={isLoading}
							color={"#F8FaFC"}
							size={50}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				)}
				<div className="text-center mb-6">
					<button
						type="submit"
						className="text-center mr-12 border-white hover:text-[#646cff]"
					>
						Login
					</button>
					<GuestLogin />
				</div>
				<div className="text-xl text-center">
					New Customer? <Link to="/register">Register.</Link>
				</div>
			</form>
		</div>
	);
};
export default LoginScreen;
