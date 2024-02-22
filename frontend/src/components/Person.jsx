import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Person = ({ person, people, setPeople }) => {
	const navigate = useNavigate();
	const followRequestHandler = async () => {
		try {
			const res = await axios.post("/api/users/send", {
				receiverId: person._id,
			});
			if (res && people.length > 1) {
				const newPeople = people.filter((p) => p._id !== person._id);
				setPeople([...newPeople]);
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
				<h3>{person.name}</h3>
				<div>
					<button type="button" onClick={followRequestHandler}>
						follow
					</button>
				</div>
			</div>
		</>
	);
};
export default Person;
