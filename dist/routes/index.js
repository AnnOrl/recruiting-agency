"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./users");
exports.initUsers = users_1.initUsers;
const login_1 = require("./login");
exports.initLogin = login_1.initLogin;
const jobs_1 = require("./jobs");
exports.initJobs = jobs_1.initJobs;
const customers_1 = require("./customers");
exports.initCustomers = customers_1.initCustomers;
const entity_1 = require("../entity");
exports.initRoutes = (server, connection) => {
    const userRepository = connection.getRepository(entity_1.Users);
    const jobRepository = connection.getRepository(entity_1.Jobs);
    const customersRepository = connection.getRepository(entity_1.Customers);
    const customerRepresentativesRepository = connection.getRepository(entity_1.CustomerRepresentatives);
    const recruitersRepository = connection.getRepository(entity_1.Recruiters);
    const gradesRepository = connection.getRepository(entity_1.Grades);
    const rolesRecruiterRepository = connection.getRepository(entity_1.RolesRecruiter);
    login_1.initLogin(server);
    users_1.initUsers(server, userRepository);
    jobs_1.initJobs(server, jobRepository);
    customers_1.initCustomers(server, customersRepository, customerRepresentativesRepository);
};
//# sourceMappingURL=index.js.map