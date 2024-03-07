import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
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
			{isLoading && (
				<div className="text-center pt-40">
					<ClipLoader
						loading={isLoading}
						color={"#F8FaFC"}
						size={100}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			)}
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
			{senders.length < 1 && !isLoading && (
				<div className="text-center mt-20">
					<p className="text-2xl font-semibold">There are now invitations.</p>
				</div>
			)}
		</>
	);
};
export default FollowReqScreen;
