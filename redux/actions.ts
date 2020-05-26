import { actionTypes } from './actionTypes';

export const setCurrentUser = (user) => ({
	type: actionTypes.CURRENT_USER,
	user
});

export const setCustomers = (customers) => ({
	type: actionTypes.CUSTOMERS,
	customers
});
