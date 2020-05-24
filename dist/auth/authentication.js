"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationMiddleware_1 = require("./authenticationMiddleware");
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const Users_1 = require("../entity/Users");
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
const initPassport = (connection) => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await connection.getRepository(Users_1.Users).findOne({ login: username });
            if (!user) {
                console.log('User not found');
                return done(null, false);
            }
            // Always use hashed passwords and fixed time comparison
            bcrypt_1.default.compare(password, user.passwordHash, (err, isValid) => {
                if (err) {
                    return done(err);
                }
                if (!isValid) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
        catch (e) {
            return done(e);
        }
    }));
    passport_1.default.authenticationMiddleware = authenticationMiddleware_1.authenticationMiddleware;
    passport_1.default.redirectMiddleware = authenticationMiddleware_1.redirectMiddleware;
};
exports.initPassport = initPassport;
//# sourceMappingURL=authentication.js.map