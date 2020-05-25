import { actionTypes } from './actionTypes';

export const setCurrentUser = (user) => ({
	type: actionTypes.CURRENT_USER,
	user
});
