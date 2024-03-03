import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { useCheckUserMutation } from "./slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout, setCredentials } from "./slices/authSlice";

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
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Header />
					<ToastContainer />
					<Outlet />
				</>
			)}
		</>
	);
};
export default App;
