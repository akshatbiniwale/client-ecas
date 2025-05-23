import axios from "axios";

export const login = async ({ email, password }) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/teacher/login",
			{
				email,
				password,
			},
			{ withCredentials: true }
		);
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

// details are for the institute
export const signUp = async ({
	name,
	id,
	address,
	phoneNumber,
	email,
	password,
}) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/admin/register",
			{
				name,
				id,
				address,
				phoneNumber,
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

export const createCourse = async ({
	course_name,
	course_code,
	department,
	semester,
	credits,
	category,
	file,
}) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/admin/course",
			{
				course_name,
				course_code,
				department,
				semester,
				credits,
				category,
				file,
			},
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		console.log(data);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const createAutoUserAccounts = async (formData) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/admin/registerstudents",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data", // This allows use to send files and images
				},
				withCredentials: true,
			}
		);
		console.log(data);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const createManualUserAccounts = async ({
	name,
	email,
	unique_id,
	department,
	password,
}) => {
	try {
		const { data } = await axios.post("/api/users/create", {
			name,
			email,
			unique_id,
			department,
			password,
		});
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const getFilterCourses = async ({ semester, year }) => {
	try {
		console.log("lol");
		const { data } = await axios.get(
			`http://localhost:5000/api/admin/courses?year=${year}&semester=${semester}`
		);
		return data.courses;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const getRooms = async () => {
	try {
		const { data } = await axios.get("http://localhost:5000/api/admin/rooms");
		return data.rooms;


	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const publishTimetable = async ({
	semester,
	year,
	courses,
	rooms,
	startDate,
	startTime,
}) => {
	try {
		console.log(courses);
		const { data } = await axios.post(
			"http://localhost:5000/api/admin/timetable/create",
			{
				semester,
				year,
				courses,
				rooms,
				startDate,
				startTime,
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

export const createAutoRooms = async (formData) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/admin/settings/create-auto-rooms",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data", // This allows use to send files and images
				},
				withCredentials: true,
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

export const createManualRooms = async (Rooms) => {
	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/admin/settings/manual-auto-rooms",
			{ Rooms }
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};
