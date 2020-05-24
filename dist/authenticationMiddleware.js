"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const authenticationMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).send({
            error: http_status_codes_1.default.getStatusText(http_status_codes_1.default.UNAUTHORIZED)
        });
    }
    next();
};
exports.authenticationMiddleware = authenticationMiddleware;
const redirectMiddleware = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};
exports.redirectMiddleware = redirectMiddleware;
//# sourceMappingURL=authenticationMiddleware.js.map