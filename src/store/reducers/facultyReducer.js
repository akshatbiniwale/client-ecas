import { createSlice } from "@reduxjs/toolkit";

const facultyInitialState = { facultyInfo: null };

const facultySlice = createSlice({
	name: "faculty",
	initialState: facultyInitialState,
	reducers: {
		setFacultyInfo(state, action) {
			state.facultyInfo = action.payload;
		},
		resetFacultyInfo(state) {
			state.facultyInfo = null;
		},
	},
});

const facultyAction = facultySlice.actions;
const facultyReducer = facultySlice.reducer;

export { facultyAction, facultyReducer };
