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
const passport_1 = __importDefault(require("passport"));
const typeorm_1 = require("typeorm");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const initCustomers = (app, customersRepository) => {
    app.get('/api/customers', passport_1.default.authenticationMiddleware, async function (req, res) {
        const take = req.query.take || 10;
        const page = req.query.page || 1;
        const keyword = req.keyword || '';
        const [result, total] = await customersRepository.findAndCount({
            where: { name: typeorm_1.Like('%' + keyword + '%') },
            order: { name: 'DESC' },
            take: take,
            skip: (page - 1) * take
        });
        return res.send({
            data: result,
            count: total,
            countPages: Math.ceil(total / take),
            page
        });
    });
    app.get('/api/customers/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        const results = await customersRepository.findOne(req.params.id);
        return res.send(results);
    });
    app.post('/api/customers', async function (req, res) {
        try {
            const customer = await customersRepository.create(req.body);
            const results = await customersRepository.save(customer);
            return res.status(http_status_codes_1.default.OK).send(results);
        }
        catch (error) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).send({ error });
        }
    });
    app.put('/api/customers/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        const customer = await customersRepository.findOne(req.params.id);
        const _a = req.body, { password } = _a, customerData = __rest(_a, ["password"]);
        customersRepository.merge(customer, customerData);
        const results = await customersRepository.save(customer);
        return res.send(results);
    });
    app.delete('/api/customers/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        const results = await customersRepository.delete(req.params.id);
        return res.send(results);
    });
};
exports.initCustomers = initCustomers;
//# sourceMappingURL=customers.js.map