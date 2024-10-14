import { configureStore } from "@reduxjs/toolkit";

import { studentReducer } from "./reducers/studentReducer";
import { facultyReducer } from "./reducers/facultyReducer";
import { operatorReducer } from "./reducers/operatorReducer";

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

const operatorInfoFromStorage = localStorage.getItem("operatorAccount")
	? JSON.parse(localStorage.getItem("operatorAccount"))
	: null;

const operatorInitialState = {
	operator: { operatorInfo: operatorInfoFromStorage },
};

const store = configureStore({
	reducer: {
		student: studentReducer,
		faculty: facultyReducer,
		operator: operatorReducer,
	},
	preloadedState: {
		...studentInitialState,
		...facultyInitialState,
		...operatorInitialState,
	},
});

export default store;
