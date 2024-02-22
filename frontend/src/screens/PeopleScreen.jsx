import { useState, useEffect } from "react";
import axios from "axios";
import Person from "../components/Person";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const PeopleScreen = () => {
	const [people, setPeople] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const peopleGetter = async () => {
			try {
				const res = await axios.get("/api/users/users-to-follow");
				if (res) {
					setPeople([...res.data]);
					setLoading(false);
				}
			} catch (err) {
				setLoading(false);
				toast.error(err?.data?.message || err.error);
			}
		};
		peopleGetter();
	}, []);

	return (
		<>
			{loading && <Loader />}
			{!loading &&
				people.length > 0 &&
				people.map((person) => {
					return (
						<div key={person._id}>
							1
							<Person
								key={person._id}
								person={person}
								people={people}
								setPeople={setPeople}
							/>
						</div>
					);
				})}
			{!loading && people.length < 1 && (
				<div>
					<p>There are no people here yet.</p>
				</div>
			)}
		</>
	);
};
export default PeopleScreen;
