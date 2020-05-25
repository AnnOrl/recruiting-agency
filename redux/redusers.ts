import { actionTypes } from './actionTypes';

const redusers = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.CURRENT_USER:
			return {
				...state,
				user: action.user
			};
		default:
			return state;
	}
};

export { redusers };
