import axios from "axios";

export const studentLogin = async ({ email, password }) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/student/login",
			{
				email,
				password,
			},
			{
				withCredentials:true
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

export const getStudentGrades = async ({year, semester}) => {
	try {
		const { data } = await axios.get(
			`http://localhost:5000/api/student/result?year=${year}&semester=${semester}`,
			{
				withCredentials:true
			}
		)
		return data.res;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
}

export const getTimetable = async ({ year, semester }) => {
	try {
		const { data } = await axios.get(
			`http://localhost:5000/api/student/grades?year=${year}&${semester}`
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};
