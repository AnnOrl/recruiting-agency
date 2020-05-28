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
		case actionTypes.JOBS:
			return {
				...state,
				jobs: action.jobs
			};
		case actionTypes.SEEKERS:
			return {
				...state,
				seekers: action.seekers
			};
		case actionTypes.MEETINGS:
			return {
				...state,
				meetings: action.meetings
			};
		case actionTypes.CURRENT_MEETINGS:
			return {
				...state,
				currentMeetings: action.currentMeetings
			};
		default:
			return state;
	}
};

export { redusers };
