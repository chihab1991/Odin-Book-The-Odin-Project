import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RequestSender = ({ sender, senders, setSenders }) => {
	const navigate = useNavigate();
	const acceptRequestHandler = async () => {
		try {
			const res = await axios.post("/api/users/accepted", {
				senderId: sender._id,
			});
			if (res && sender.length > 1) {
				const newSender = senders.filter((sen) => sen._id !== sender._id);
				setSenders([...newSender]);
			} else {
				navigate("/");
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	const refuseRequestHandler = async () => {
		try {
			const res = await axios.post("/api/users/refused", {
				senderId: sender._id,
			});
			if (res && senders.length > 1) {
				const newRequest = senders.filter((req) => req._id !== sender._id);
				setSenders([...newRequest]);
			} else {
				navigate("/");
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<div className="flex items-center justify-between shadow-slate-500 shadow-sm p-8 mb-4 my-auto">
				<div className="flex items-center ">
					<img
						src={sender.profilePic}
						alt={sender.name}
						className="w-12 rounded-full mr-4"
					/>
					<h3 className="text-xl font-semibold">{sender.name}</h3>
				</div>
				<div>
					<button
						type="button"
						onClick={acceptRequestHandler}
						className="border-slate-500 border hover:text-[#646cff] mr-4"
					>
						Accept
					</button>
					<button
						type="button"
						onClick={refuseRequestHandler}
						className="border-slate-500 border hover:text-[#646cff]"
					>
						Decline
					</button>
				</div>
			</div>
		</>
	);
};
export default RequestSender;
