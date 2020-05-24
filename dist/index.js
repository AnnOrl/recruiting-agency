"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const next_1 = __importDefault(require("next"));
const Users_1 = require("./entity/Users");
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
    console.log('!!!!!', connection);
    const userRepository = connection.getRepository(Users_1.Users);
    // create and setup express app
    const server = express_1.default();
    server.use(body_parser_1.default.json());
    // register routes
    server.get('/api/users', async function (_req, res) {
        const users = await userRepository.find();
        res.json(users);
    });
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(process.env.PORT || 3000);
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map