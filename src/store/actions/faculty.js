import { facultyAction } from "../reducers/facultyReducer";

export const logout = () => (dispatch) => {
	dispatch(facultyAction.resetfacultyInfo());
	localStorage.removeItem("facultyAccount");
};
