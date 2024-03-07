import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useCheckUserMutation } from "./slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout, setCredentials } from "./slices/authSlice";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
	const dispatch = useDispatch();
	const [checkUser, { isLoading }] = useCheckUserMutation();
	useEffect(() => {
		const userChecker = async () => {
			try {
				const userExist = await checkUser().unwrap();
				if (userExist) {
					dispatch(setCredentials(userExist));
				}
			} catch (err) {
				if (err) {
					dispatch(logout());
				}
			}
		};
		userChecker();
	}, [checkUser, dispatch]);
	return (
		<div className="bg-slate-900 text-white min-h-screen">
			<div>
				{isLoading ? (
					<div className="w-screen h-screen flex justify-center items-center delay-800">
						<ClipLoader
							loading={isLoading}
							color={"#F8FaFC"}
							size={150}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				) : (
					<>
						<Header />
						<ToastContainer />
						<div className="w-[600px]  mx-auto pt-20">
							<Outlet />
						</div>
					</>
				)}
			</div>
		</div>
	);
};
export default App;
