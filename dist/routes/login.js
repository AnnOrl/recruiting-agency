"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const initLogin = (app) => {
    app.post('/api/login', function (req, res, next) {
        passport_1.default.authenticate('local', function (error, user, info) {
            if (error) {
                return res.status(http_status_codes_1.default.UNAUTHORIZED).send({
                    error
                });
            }
            if (!user) {
                return res.status(http_status_codes_1.default.UNAUTHORIZED).send({
                    error: 'Пользователь не найдет, возможно неверно введен логин или пароль'
                });
            }
            return req.logIn(user, (err) => {
                if (err) {
                    return res.status(http_status_codes_1.default.UNAUTHORIZED).send({
                        error: err
                    });
                }
                res.status(http_status_codes_1.default.OK).send({ user });
                return next();
            });
        })(req, res, next);
    });
    app.get('/api/logout', function (req, res, next) {
        req.logout();
        res.status(http_status_codes_1.default.OK).send();
        return next();
    });
};
exports.initLogin = initLogin;
//# sourceMappingURL=login.js.map