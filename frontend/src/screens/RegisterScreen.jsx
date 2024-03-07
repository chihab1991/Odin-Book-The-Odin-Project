import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const RegisterScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Password do not match.");
		} else {
			try {
				const res = await register({ name, email, password }).unwrap();
				if (res) {
					navigate("/login");
				}
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};
	return (
		<div className="flex min-h-screen justify-center items-center ">
			<form
				onSubmit={submitHandler}
				className="shadow-slate-500 shadow-sm px-6 py-10 rounded-md border-2 border-slate-500"
			>
				<h2 className="text-5xl font-semibold text-center mb-12">Register</h2>
				<div className="mb-6">
					<label htmlFor="name" className="inline-block text-2xl mr-2 w-52">
						Name:
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="text-xl inline-block p-2 text-slate-900 w-80"
					/>
				</div>
				<div className="mb-6">
					<label htmlFor="email" className="inline-block text-2xl mr-2 w-52">
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
					<label htmlFor="password" className="inline-block text-2xl mr-2 w-52">
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
				<div className="mb-6">
					<label
						htmlFor="confirmPassword"
						className="inline-block text-2xl mr-2 w-52"
					>
						Confirm Password:
					</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="text-xl inline-block p-2 text-slate-900 w-80"
					/>
				</div>
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

				<div className="text-center mb-6">
					<button
						type="submit"
						className="text-center text-xl border-white px-8 hover:text-[#646cff]"
					>
						Sign up
					</button>
				</div>
				<div className="text-xl text-center">
					Already have an account? <Link to="/login">Login.</Link>
				</div>
			</form>
		</div>
	);
};
export default RegisterScreen;
