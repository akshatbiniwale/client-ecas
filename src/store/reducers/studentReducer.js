import { createSlice } from "@reduxjs/toolkit";

const studentInitialState = { studentInfo: null };

const studentSlice = createSlice({
	name: "student",
	initialState: studentInitialState,
	reducers: {
		setStudentInfo(state, action) {
			state.studentInfo = action.payload;
		},
		resetStudentInfo(state) {
			state.studentInfo = null;
		},
	},
});

const studentAction = studentSlice.actions;
const studentReducer = studentSlice.reducer;

export { studentAction, studentReducer };
