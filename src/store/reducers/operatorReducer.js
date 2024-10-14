import { createSlice } from "@reduxjs/toolkit";

const operatorInitialState = { operatorInfo: null };

const operatorSlice = createSlice({
	name: "operator",
	initialState: operatorInitialState,
	reducers: {
		setOperatorInfo(state, action) {
			state.operatorInfo = action.payload;
		},
		resetOperatorInfo(state) {
			state.operatorInfo = null;
		},
	},
});

const operatorAction = operatorSlice.actions;
const operatorReducer = operatorSlice.reducer;

export { operatorAction, operatorReducer };
