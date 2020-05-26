import { actionTypes } from './actionTypes';

const redusers = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.CURRENT_USER:
			return {
				...state,
				user: action.user
			};
		case actionTypes.CUSTOMERS:
			return {
				...state,
				customers: action.customers
			};
		default:
			return state;
	}
};

export { redusers };
