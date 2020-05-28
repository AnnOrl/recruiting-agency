"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const next_1 = __importDefault(require("next"));
const passport_1 = __importDefault(require("passport"));
const redis_1 = __importDefault(require("redis"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const authentication_1 = require("./auth/authentication");
const config_1 = require("./config");
const entity_1 = require("./entity");
const controllers_1 = require("./controllers");
const redisClient = redis_1.default.createClient();
const RedisStore = connect_redis_1.default(express_session_1.default);
const dev = process.env.NODE_ENV !== 'production';
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
app
    .prepare()
    .then(() => typeorm_1.createConnection({
    name: 'recruting_agency',
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '1111',
    database: 'recruting_agency',
    synchronize: true,
    logging: false,
    entities: [
        entity_1.Users,
        entity_1.Customers,
        entity_1.CustomerRepresentatives,
        entity_1.Jobs,
        entity_1.Recruiters,
        entity_1.RolesRecruiter,
        entity_1.Grades,
        entity_1.Interviews,
        entity_1.InterviewStage,
        entity_1.InterviewStageStatuses,
        entity_1.JobSeekers,
        entity_1.SeekersSkills,
        entity_1.Skills,
        entity_1.AssessmentResponses,
        entity_1.Meetings,
        entity_1.Questions,
        entity_1.QuestionsCategory,
        entity_1.QuestionsSubCategory,
        entity_1.SetQuestions,
        entity_1.JobSkills,
        entity_1.Calendar
    ]
}))
    .then((connection) => {
    // create and setup express app
    const server = express_1.default();
    server.use(body_parser_1.default.urlencoded({
        extended: true
    }));
    server.use(body_parser_1.default.json());
    server.use(cookie_parser_1.default());
    server.use(cookie_session_1.default({
        name: 'session',
        keys: ['session']
    }));
    authentication_1.initPassport(connection);
    server.use(express_session_1.default({
        store: new RedisStore({
            client: redisClient,
            url: config_1.config.redisStore.url
        }),
        secret: config_1.config.redisStore.secret,
        resave: false,
        saveUninitialized: false
    }));
    server.use(passport_1.default.initialize());
    server.use(passport_1.default.session());
    controllers_1.initRoutes(server, connection);
    server.all('/', passport_1.default.redirectMiddleware, (req, res) => handle(req, res));
    server.all('/login', (req, res) => handle(req, res));
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(process.env.PORT || 3000);
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map