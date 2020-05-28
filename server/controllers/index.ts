import { initUsers } from './users';
import { initLogin } from './login';
import { initJobs } from './jobs';
import { initCustomers } from './customers';
import { initRecruiters } from './recruiters';
import { initSeekers } from './seekers';
import { initMeetings } from './meetings';
import { initInterviews } from './interviews';
import { initCalendars } from './calendars';
import {
	Users,
	Customers,
	CustomerRepresentatives,
	Jobs,
	Recruiters,
	RolesRecruiter,
	Grades,
	JobSeekers,
	Meetings,
	Interviews,
	Calendar
} from '../entity';

export const initRoutes = (server, connection) => {
	const userRepository = connection.getRepository(Users);
	const jobRepository = connection.getRepository(Jobs);
	const customersRepository = connection.getRepository(Customers);
	const customerRepresentativesRepository = connection.getRepository(CustomerRepresentatives);
	const recruitersRepository = connection.getRepository(Recruiters);
	const gradesRepository = connection.getRepository(Grades);
	const calendarRepository = connection.getRepository(Calendar);
	const jobSeekersRepository = connection.getRepository(JobSeekers);
	const meetingsRepository = connection.getRepository(Meetings);
	const interviewsRepository = connection.getRepository(Interviews);

	initLogin(server);
	initUsers(server, userRepository);
	initJobs(server, jobRepository);
	initRecruiters(server, recruitersRepository);
	initCustomers(server, customersRepository, customerRepresentativesRepository);
	initSeekers(server, jobSeekersRepository);
	initMeetings(server, meetingsRepository);
	initInterviews(server, interviewsRepository);
	initCalendars(server, calendarRepository);
};
export { initUsers, initLogin, initJobs, initCustomers };
