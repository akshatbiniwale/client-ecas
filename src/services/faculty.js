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

export const getCourseList = async () => {
	try {
		const { data } = await axios.get(
			"http://localhost:5000/api/teacher/getCourseStructure/"
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const courseStructureUpdate = async (courseStructure) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/updateCourseStructure",
			courseStructure
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const scheduleISE = async (theoryISEschedule) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/scheduleISE",
			theoryISEschedule
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const uploadTheoryMarks = async ({ name, code, theoryMarks }) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/uploadTheoryMarks",
			{
				name,
				code,
				theoryMarks,
			},
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
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
