import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsSlice from "./slices/postsSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		posts: postsSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
