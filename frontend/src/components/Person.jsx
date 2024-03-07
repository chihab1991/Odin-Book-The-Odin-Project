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
			<div className="flex items-center justify-between shadow-slate-500 shadow-sm p-8 mb-4 my-auto">
				<div className="flex items-center ">
					<img
						src={person.profilePic}
						alt={person.name}
						className="w-12 rounded-full mr-4"
					/>
					<h3 className="text-xl font-semibold">{person.name}</h3>
				</div>
				<div className="mr-8">
					<button
						type="button"
						onClick={followRequestHandler}
						className="border-slate-500 border hover:text-[#646cff]"
					>
						follow
					</button>
				</div>
			</div>
		</>
	);
};
export default Person;
