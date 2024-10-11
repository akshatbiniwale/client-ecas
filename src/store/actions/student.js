import { studentAction } from "../reducers/studentReducer";

export const logout = () => (dispatch) => {
	dispatch(studentAction.resetStudentInfo());
	localStorage.removeItem("studentAccount");
};
