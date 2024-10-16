import axios from "axios";

export const studentLogin = async ({ email, password }) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/student/login",
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
