"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const redis_1 = __importDefault(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const next_1 = __importDefault(require("next"));
const Users_1 = require("./entity/Users");
const config_1 = require("./config");
const authentication_1 = require("./auth/authentication");
const users_1 = require("./routes/users");
const login_1 = require("./routes/login");
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
    entities: [Users_1.Users]
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
    login_1.initLogin(server);
    users_1.initUsers(server, connection.getRepository(Users_1.Users));
    server.all('/', passport_1.default.redirectMiddleware, (req, res) => handle(req, res));
    server.all('/login', (req, res) => handle(req, res));
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(process.env.PORT || 3000);
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map