import axios from "axios";

// all routes for api calls need to be verfied

export const facultyLogin = async ({ email, password }) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/login",
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

export const getCourseList = async () => {
	try {
		const { data } = await axios.get("http://localhost:5000/api/teacher/courses", {withCredentials:true});
		console.log(data)
		return data.courses;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const courseStructureUpdate = async (courseStructure,courseId) => {
	try {
		const { data } = await axios.put(
			"http://localhost:5000/api/teacher/course/edit",
			{courseStructure,courseId},
			{withCredentials:true}
		)
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

export const uploadTheoryMarks = async ({ name, course, csvTheoryFile }) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/course/marks",
			{
				name,
				course,
				file:csvTheoryFile,
			},
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
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

export const scheduleLabESE = async (labESEschedule) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/scheduleISE",
			labESEschedule
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const uploadLabMarks = async ({ name, code, theoryMarks }) => {
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

export const getFilteredCourses = async ( year, semester ) => {
	try {
		const { data } = await axios.get(
			`http://localhost:5000/api/teacher/courses?year=${year}&semester=${semester}`,
			{
				withCredentials:true
			}
		)
		return data.courses;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const getSubjectMarks = async (subject) => {
	try {
		const { data } = await axios.get(
			"http://localhost:5000/api/teacher/getFilteredMarks",
			subject
		)
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const getSAValue = async (courseId) => {
	try {
		console.log(courseId)
		const { data } = await axios.get(
			`http://localhost:5000/api/teacher/course/sa?course=${courseId}`,
			{
				withCredentials:true
			}
		)
		console.log(data.data)
		return data.data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const setFinalSAValue = async (finalSAValue,course) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/course/grade",
			{
				sa:finalSAValue,
				course,
				span:9   //Just for test
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
