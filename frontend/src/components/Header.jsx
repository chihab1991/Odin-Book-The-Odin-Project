import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "./../slices/usersApiSlice";
import { logout } from "./../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);

	const [logoutApi] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApi().unwrap();
			dispatch(logout());
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<header className="py-4 px-3 shadow-slate-600 shadow fixed w-full bg-slate-900">
			<nav className="max-w-screen-xl  mx-auto flex justify-between items-center">
				<div className="nav-left">
					<Link to="/">
						<h2 className="text-3xl font-bold">Odin Book</h2>
					</Link>
				</div>
				<div className="nav-right">
					<ul className="flex justify-between items-center text-xl font-bold">
						{userInfo ? (
							<>
								<li className="ml-6">
									<Link to="/profile" className="font-bold">
										<img
											src={userInfo.profilePic}
											alt={`${userInfo.name} profile picture`}
											className="size-7 rounded-full"
										/>
									</Link>
								</li>
								<li className="ml-6">
									<Link to="/people" className="font-bold">
										People
									</Link>
								</li>
								<li className="ml-6">
									<Link to="/follow-request" className="font-bold">
										Invitation
									</Link>
								</li>
								<li className="ml-6">
									<Link to="/add-new-post" className="font-bold">
										New Post
									</Link>
								</li>
								<li
									className="ml-6 font-bold cursor-pointer text-[#646cff] hover:text-[#535bf2]"
									onClick={logoutHandler}
								>
									Logout
								</li>
							</>
						) : (
							<>
								<li className="ml-6">
									<Link to="/login" className="font-bold">
										Sign In
									</Link>
								</li>
								<li className="ml-6">
									<Link to="/register" className="font-bold">
										Sign Up
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
};
export default Header;
