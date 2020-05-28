import axios from 'axios';
import { setCurrentUser, setCustomers, setJobs, setSeekers, setMeetings, setCurrentMeetings } from '../redux/actions';

export const getUser = (dispatch, store) =>
	!store.user
		? axios.get('/api/users-current').then(({ data }) => dispatch(setCurrentUser(data.user)))
		: Promise.resolve();

export const getCustomers = (dispatch, store?, params?) => {
	return !store || !store.customers || !store.customers.data
		? axios.get('/api/customers', { params }).then(({ data }) => dispatch(setCustomers(data)))
		: Promise.resolve();
};

export const getJobs = (dispatch, store?, params?) => {
	return !store || !store.jobs || !store.jobs.data
		? axios.get('/api/jobs', { params }).then(({ data }) => dispatch(setJobs(data)))
		: Promise.resolve();
};

export const getSeekers = (dispatch, store?, params?) => {
	return !store || !store.seekers || !store.seekers.data
		? axios.get('/api/seekers', { params }).then(({ data }) => dispatch(setSeekers(data)))
		: Promise.resolve();
};

export const getMeeting = (dispatch, store?, params?) => {
	return !store || !store.meetings || !store.meetings.data
		? axios.get('/api/meetings', { params }).then(({ data }) => dispatch(setMeetings(data)))
		: Promise.resolve();
};

export const getCurrentMeeting = (dispatch, store?, params?) => {
	return !store || !store.currentMeetings || !store.currentMeetings.data
		? axios.get('/api/calendars', { params }).then(({ data }) => dispatch(setCurrentMeetings(data)))
		: Promise.resolve();
};
