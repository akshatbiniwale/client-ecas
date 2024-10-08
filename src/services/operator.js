import axios from "axios";

export const login = async ({ email, password }) => {
	try {
		const { data } = await axios.post("", {
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
	year,
	semester,
	credits,
	category,
	parsedData,
}) => {
	try {
		const { data } = await axios.post("/api/courses/create", {
			course_name,
			course_code,
			year,
			semester,
			credits,
			category,
			parsedData,
		});
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const createAutoUserAccounts = async ({ parsedData, password }) => {
	try {
		const { data } = await axios.post("/api/users/create", {
			parsedData,
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
