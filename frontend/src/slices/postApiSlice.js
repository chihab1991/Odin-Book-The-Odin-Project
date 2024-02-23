import { apiSlice } from "./apiSlice";

const POSTS_URL = "/api/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addPost: builder.mutation({
			query: (data) => ({
				url: `${POSTS_URL}/`,
				method: "POST",
				body: data,
			}),
		}),
		getAllPosts: builder.mutation({
			query: () => ({
				url: `${POSTS_URL}/all`,
				method: "GET",
			}),
		}),
		getPost: builder.mutation({
			query: (data) => ({
				url: `${POSTS_URL}/get-post`,
				method: "POST",
				body: data,
			}),
		}),
		deletePost: builder.mutation({
			query: (data) => ({
				url: `${POSTS_URL}/`,
				method: "DELETE",
				body: data,
			}),
		}),
		likePost: builder.mutation({
			query: (data) => ({
				url: `/api/like/`,
				method: "POST",
				body: data,
			}),
		}),
		unlikePost: builder.mutation({
			query: (data) => ({
				url: `/api/like/`,
				method: "DELETE",
				body: data,
			}),
		}),
	}),
});

export const {
	useAddPostMutation,
	useGetAllPostsMutation,
	useGetPostMutation,
	useDeletePostMutation,
	useLikePostMutation,
	useUnlikePostMutation,
} = postsApiSlice;
