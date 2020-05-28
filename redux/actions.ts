import { actionTypes } from './actionTypes';

export const setCurrentUser = (user) => ({
	type: actionTypes.CURRENT_USER,
	user
});

export const setCustomers = (customers) => ({
	type: actionTypes.CUSTOMERS,
	customers
});

export const setJobs = (jobs) => ({
	type: actionTypes.JOBS,
	jobs
});

export const setSeekers = (seekers) => ({
	type: actionTypes.SEEKERS,
	seekers
});

export const setMeetings = (meetings) => ({
	type: actionTypes.MEETINGS,
	meetings
});

export const setCurrentMeetings = (currentMeetings) => ({
	type: actionTypes.CURRENT_MEETINGS,
	currentMeetings
});
