import axios from 'axios';
import { setCurrentUser, setCustomers } from '../redux/actions';

export const getUser = (dispatch, store) =>
	!store.user
		? axios.get('/api/users-current').then(({ data }) => dispatch(setCurrentUser(data.user)))
		: Promise.resolve();

export const getCustomers = (dispatch, store?, params?) => {
	console.log(params);
	return !store || !store.customers || !store.customers.data
		? axios.get('/api/customers', { params }).then(({ data }) => dispatch(setCustomers(data)))
		: Promise.resolve();
};
