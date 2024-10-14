import { operatorAction } from "../reducers/operatorReducer";

export const logout = () => (dispatch) => {
	dispatch(operatorAction.resetOperatorInfo());
	localStorage.removeItem("operatorAccount");
};
