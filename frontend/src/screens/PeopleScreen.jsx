import { useState, useEffect } from "react";
import axios from "axios";
import Person from "../components/Person";
import ClipLoader from "react-spinners/ClipLoader";
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
			{loading && (
				<div className="text-center pt-40">
					<ClipLoader
						loading={loading}
						color={"#F8FaFC"}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			)}
			{!loading &&
				people.length > 0 &&
				people.map((person) => {
					return (
						<div key={person._id}>
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
				<div className="flex justify-center items-center">
					<p className="text-3xl font-semibold">
						There are no people here yet.
					</p>
				</div>
			)}
		</>
	);
};
export default PeopleScreen;
