import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: null,
};
// userInfo: localStorage.getItem("userInfo")
// 	? JSON.parse(localStorage.getItem("userInfo"))
// 	: null,
// };
// TODO fix login auth
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		logout: (state, action) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
		},
		updateProfilePic: (state, action) => {
			state.userInfo = {
				...state.userInfo,
				profilePic: action.payload.profilePic,
			};
			localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
		},
		deleteProfilePic: (state, action) => {
			state.userInfo = {
				...state.userInfo,
				profilePic: action.payload.profilePic,
			};
			localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
		},
	},
});

export const { setCredentials, logout, updateProfilePic, deleteProfilePic } =
	authSlice.actions;

export default authSlice.reducer;
