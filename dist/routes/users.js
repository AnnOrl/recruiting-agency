"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Generate Password
const generatePassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    return bcrypt_1.default.hashSync(password, salt);
};
const initUsers = (app, userRepository) => {
    app.get('/api/users', passport_1.default.authenticationMiddleware, async function (req, res) {
        const users = await userRepository.find();
        res.json(users);
    });
    app.get('/api/users-current', passport_1.default.authenticationMiddleware, function (req, res) {
        res.json({ user: req.user });
    });
    app.get('/api/users/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        const results = await userRepository.findOne(req.params.id);
        return res.send(results);
    });
    app.post('/api/users', async function (req, res) {
        try {
            const { password, username, email, name, role } = req.body;
            const user = await userRepository.create({
                login: username,
                email,
                name,
                role,
                passwordHash: generatePassword(password)
            });
            const results = await userRepository.save(user);
            return res.status(http_status_codes_1.default.OK).send(results);
        }
        catch (error) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).send({ error });
        }
    });
    app.put('/api/users/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        const user = await userRepository.findOne(req.params.id);
        const _a = req.body, { password } = _a, userData = __rest(_a, ["password"]);
        userRepository.merge(user, Object.assign(Object.assign({}, userData), password ? generatePassword(password) : {}));
        const results = await userRepository.save(user);
        return res.send(results);
    });
    app.delete('/api/users/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        const results = await userRepository.delete(req.params.id);
        return res.send(results);
    });
};
exports.initUsers = initUsers;
//# sourceMappingURL=users.js.map