import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RequestSender from "../components/RequestSender";

const FollowReqScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [senders, setSenders] = useState([]);
	useEffect(() => {
		const requestsGetter = async () => {
			try {
				const { data } = await axios.get("/api/users/follow-request");
				if (data) {
					setIsLoading(false);
					setSenders([...data]);
				}
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		};
		requestsGetter();
	}, []);

	return (
		<>
			{isLoading && <h2>Loading...</h2>}
			{senders &&
				senders.map((sender) => {
					return (
						<RequestSender
							key={sender._id}
							sender={sender}
							senders={senders}
							setSenders={setSenders}
						/>
					);
				})}
		</>
	);
};
export default FollowReqScreen;
