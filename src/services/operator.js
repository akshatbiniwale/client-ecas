import axios from "axios";

export const login = async ({ email, password }) => {
	try {
		const { data } = await axios.post("http://localhost:5000/api/teacher/login", {
			email,
			password,
		},{withCredentials:true});
		console.log(data)
		return data;
	} catch (error) {
		console.log(error)
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
	phone_number,
	email,
	password,
}) => {
	try {
		const { data } = await axios.post("/api/users/register", {
			name,
			id,
			address,
			phone_number,
			email,
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

export const createCourse = async ({
	course_name,
	course_code,
	department,
	semester,
	credits,
	category,
	file
}) => {
	try {
		const { data } = await axios.post("http://localhost:5000/api/admin/course", {
			course_name,
			course_code,
			department,
			semester,
			credits,
			category,
			file
		},{
			headers:{
				"Content-Type":"multipart/form-data"
			}
		});
		console.log(data)
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
		const { data } = await axios.post("http://localhost:5000/api/admin/registerstudents", formData, {
			headers:{
				'Content-Type': 'multipart/form-data'  // This allows use to send files and images
			},
			withCredentials:true
		});
		console.log(data)
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
