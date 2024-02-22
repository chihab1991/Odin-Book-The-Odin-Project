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
		<header>
			<nav>
				<div className="nav-left">
					<h2>Odin Book</h2>
				</div>
				<div className="nav-right">
					<ul>
						{userInfo ? (
							<>
								<li>
									<Link to="/profile">{userInfo.name}</Link>
								</li>
								<li>
									<Link to="/people">People</Link>
								</li>
								<li>
									<Link to="/follow-request">Requests</Link>
								</li>
								<li>
									<Link to="/add-new-post">New Post</Link>
								</li>
								<li onClick={logoutHandler}>Logout</li>
							</>
						) : (
							<>
								<li>
									<Link to="/login">Sign In</Link>
								</li>
								<li>
									<Link to="/register">Sign Up</Link>
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
