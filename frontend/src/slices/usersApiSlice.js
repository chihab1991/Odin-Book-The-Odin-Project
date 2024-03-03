import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: "POST",
				body: data,
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
			}),
		}),
		checkUser: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/check-user`,
				method: "POST",
			}),
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/update`,
				method: "PUT",
				body: data,
			}),
		}),
		updateUserPicture: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile-pic`,
				method: "PUT",
				body: data,
			}),
		}),
		deleteUserPicture: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/profile-pic`,
				method: "Delete",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useUpdateUserMutation,
	useCheckUserMutation,
	useUpdateUserPictureMutation,
	useDeleteUserPictureMutation,
} = usersApiSlice;
