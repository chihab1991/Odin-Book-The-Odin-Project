import { createSlice } from "@reduxjs/toolkit";

const initialState = { posts: null };

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		removePost: (state, action) => {
			state.posts = state.posts.filter((post) => post._id !== action.payload);
		},
		addLike: (state, action) => {
			state.posts = state.posts.map((post) => {
				if (post._id === action.payload.postId) {
					post.likes.push(action.payload.userId);
				}
				return post;
			});
		},
		removeLike: (state, action) => {
			state.posts = state.posts.map((post) => {
				if (post._id === action.payload.postId) {
					let index = post.likes.indexOf(action.payload.userId);
					post.likes.splice(index, 1);
				}
				return post;
			});
		},
	},
});
export const { setPosts, removePost, addLike, removeLike } = postsSlice.actions;

export default postsSlice.reducer;
