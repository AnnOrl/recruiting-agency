import { initUsers } from './users';
import { initLogin } from './login';
import { initJobs } from './jobs';
import { initCustomers } from './customers';
import { Users, Customers, CustomerRepresentatives, Jobs, Recruiters, RolesRecruiter, Grades } from '../entity';

export const initRoutes = (server, connection) => {
	const userRepository = connection.getRepository(Users);
	const jobRepository = connection.getRepository(Jobs);
	const customersRepository = connection.getRepository(Customers);
	const customerRepresentativesRepository = connection.getRepository(CustomerRepresentatives);
	const recruitersRepository = connection.getRepository(Recruiters);
	const gradesRepository = connection.getRepository(Grades);
	const rolesRecruiterRepository = connection.getRepository(RolesRecruiter);

	initLogin(server);
	initUsers(server, userRepository);
	initJobs(server, jobRepository);
	initCustomers(server, customersRepository, customerRepresentativesRepository);
};
export { initUsers, initLogin, initJobs, initCustomers };
