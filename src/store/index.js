import { configureStore } from "@reduxjs/toolkit";

import { studentReducer } from "./reducers/studentReducer";
import { facultyReducer } from "./reducers/facultyReducer";

const studentInfoFromStorage = localStorage.getItem("studentAccount")
	? JSON.parse(localStorage.getItem("studentAccount"))
	: null;

const studentInitialState = {
	student: { studentInfo: studentInfoFromStorage },
};

const facultyInfoFromStorage = localStorage.getItem("facultyAccount")
	? JSON.parse(localStorage.getItem("facultyAccount"))
	: null;

const facultyInitialState = {
	faculty: { facultyInfo: facultyInfoFromStorage },
};

const store = configureStore({
	reducer: {
		student: studentReducer,
		faculty: facultyReducer,
	},
	preloadedState: {
		...studentInitialState,
		...facultyInitialState,
	},
});

export default store;