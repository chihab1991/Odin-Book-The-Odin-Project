import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addPost: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/`,
				method: "POST",
				body: data,
			}),
		}),
		getAllPosts: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/all`,
				method: "GET",
			}),
		}),
		getPost: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/get-post`,
				method: "POST",
				body: data,
			}),
		}),
		deletePost: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/`,
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
} = postsApiSlice;
