import axios from "axios";

export const login = async ({ email, password }) => {
	try {
		// const { data } = await axios.post("", {
		// 	email,
		// 	password,
		// });
		console.log("from login service - ", email, password);
		// return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};