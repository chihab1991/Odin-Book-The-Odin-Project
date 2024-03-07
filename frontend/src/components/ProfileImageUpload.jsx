import { useState } from "react";
import { storage } from "../firebase";
import { useDispatch } from "react-redux";
import { useUpdateUserPictureMutation } from "../slices/usersApiSlice";
import { updateProfilePic } from "../slices/authSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import DeleteProfileImg from "./DeleteProfileImg";

const ProfileImageUpload = ({ profilePic, name }) => {
	const [image, setImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const dispatch = useDispatch();
	const [updateUserPicture, { isLoading }] = useUpdateUserPictureMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (image !== null) {
				const imageRef = ref(storage, `profileImages/${image.name + v4()}`);
				const uploadedImage = await uploadBytes(imageRef, image);
				const url = await getDownloadURL(uploadedImage.ref);
				//TODO upload url to users db
				const res = await updateUserPicture({ imageUrl: url }).unwrap();
				if (res) {
					dispatch(updateProfilePic(res));
					setPreviewImage(null);
					setImage(null);
				}
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit} className="mb-4">
				{previewImage && (
					<div className=" mb-8">
						<img src={previewImage} alt={name + " profile picture preview"} />
					</div>
				)}
				<div className="flex items-center mb-4">
					<label htmlFor="img" className="inline-block text-2xl mr-4 grow">
						Select a profile picture:
					</label>
					<input
						type="file"
						name="img"
						id="img"
						onChange={(e) => {
							setPreviewImage(
								e.target.files[0]
									? URL.createObjectURL(e.target.files[0])
									: null
							);
							setImage(e.target.files[0]);
						}}
						className="text-xl inline-block p-2 text-slate-900 w-80"
					/>
				</div>
				{/* TODO change button text */}
				<button className="text-center text-xl border-white px-8  ml-2 mr-8 hover:text-[#646cff]">
					Upload Image
				</button>
				<DeleteProfileImg />
			</form>
		</>
	);
};
export default ProfileImageUpload;
