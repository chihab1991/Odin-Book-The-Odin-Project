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
		newComment: (state, action) => {
			state.posts = state.posts.map((post) => {
				if (post._id === action.payload.postId) {
					post.comments.push(action.payload.comment);
				}
				return post;
			});
		},
		editComment: (state, action) => {
			state.posts = state.posts.map((post) => {
				if (post._id === action.payload.postId) {
					const targetComment = post.comments.find(
						(comment) => comment._id === action.payload.commentId
					);
					targetComment.text = action.payload.comment.text;
				}
				return post;
			});
		},
		removeComment: (state, action) => {
			state.posts = state.posts.map((post) => {
				if (post._id === action.payload.postId) {
					const commentIndex = post.comments.findIndex(
						(comment) => comment._id === action.payload.commentId
					);
					post.comments.splice(commentIndex, 1);
				}
				return post;
			});
		},
	},
});
export const {
	setPosts,
	removePost,
	addLike,
	removeLike,
	newComment,
	editComment,
	removeComment,
} = postsSlice.actions;

export default postsSlice.reducer;
