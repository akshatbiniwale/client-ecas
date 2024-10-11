import axios from "axios";

export const facultyLogin = async ({ email, password }) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/login",
			{
				email,
				password,
			}
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};
