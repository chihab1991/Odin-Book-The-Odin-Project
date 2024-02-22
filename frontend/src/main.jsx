import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UsersScreen from "./screens/PeopleScreen.jsx";
import FollowReqScreen from "./screens/FollowReqScreen.jsx";
import AddNewPostScreen from "./screens/AddNewPostScreen.jsx";
import PeopleScreen from "./screens/PeopleScreen.jsx";
import EditPostScreen from "./screens/EditPostScreen.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route path="" element={<PrivateRoute />}>
				<Route path="/" index={true} element={<HomeScreen />} />
				<Route path="/profile" element={<ProfileScreen />} />
				<Route path="/people" element={<PeopleScreen />} />
				<Route path="/follow-request" element={<FollowReqScreen />} />
				<Route path="/add-new-post" element={<AddNewPostScreen />} />
				<Route path="/edit/:postId" element={<EditPostScreen />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
