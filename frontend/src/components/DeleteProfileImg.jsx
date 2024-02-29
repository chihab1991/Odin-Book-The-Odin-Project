import { useDeleteUserPictureMutation } from "../slices/usersApiSlice";
import { deleteProfilePic } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const DeleteProfileImg = () => {
	const dispatch = useDispatch();
	const [deleteUserPicture, { isLoading }] = useDeleteUserPictureMutation();

	const handleClick = async () => {
		try {
			const res = await deleteUserPicture().unwrap();
			if (res) {
				dispatch(deleteProfilePic(res));
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<>
			<button onClick={handleClick}>Delete</button>
		</>
	);
};
export default DeleteProfileImg;
