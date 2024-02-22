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
			<div>
				<div>person Pic</div>
				<h3>{sender.name}</h3>
				<div>
					<button type="button" onClick={acceptRequestHandler}>
						Accept
					</button>
					<button type="button" onClick={refuseRequestHandler}>
						Decline
					</button>
				</div>
			</div>
		</>
	);
};
export default RequestSender;
