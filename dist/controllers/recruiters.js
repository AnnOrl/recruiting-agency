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
const customers = [
    {
        id_customer: 1,
        email: null
    },
    {
        id_customer: 4,
        email: null
    },
    {
        id_customer: 5,
        email: null
    },
    {
        id_customer: 6,
        email: '5'
    },
    {
        id_customer: 9,
        email: 'zakaz@vdgb.ru'
    },
    {
        id_customer: 10,
        email: 'zakaz@nav-it.ru'
    },
    {
        id_customer: 11,
        email: 'zakaz@aventa-group.ru'
    },
    {
        id_customer: 12,
        email: 'welcome@rosintegracija.ru'
    },
    {
        id_customer: 13,
        email: 'zayavka@controlbara.ru'
    },
    {
        id_customer: 14,
        email: 'zakaz@my-pos.ru'
    },
    {
        id_customer: 15,
        email: 'standart7@yandex.ru'
    },
    {
        id_customer: 16,
        email: 'msk@st54.ru, info@st54.ru'
    },
    {
        id_customer: 17,
        email: 'info@soft-alians.ru'
    },
    {
        id_customer: 18,
        email: 'support@w1.ru'
    },
    {
        id_customer: 19,
        email: 'support@platron.ru'
    },
    {
        id_customer: 20,
        email: 'support@money.yandex.ru'
    },
    {
        id_customer: 21,
        email: 'market@faktura.ru'
    },
    {
        id_customer: 22,
        email: 'info@payu.ru'
    },
    {
        id_customer: 23,
        email: 'info@payhd.ru'
    },
    {
        id_customer: 24,
        email: 'info@inplat.ru'
    },
    {
        id_customer: 25,
        email: 'info@chronopay.com'
    },
    {
        id_customer: 26,
        email: 'support@corp.mail.ru'
    },
    {
        id_customer: 27,
        email: 'hello@payler.com'
    },
    {
        id_customer: 28,
        email: ''
    },
    {
        id_customer: 29,
        email: ''
    },
    {
        id_customer: 30,
        email: 'info@rambler.ru'
    },
    {
        id_customer: 31,
        email: ''
    }
];
const initRecruiters = (app, recruitersRepository) => {
    app.get('/api/recruiters', passport_1.default.authenticationMiddleware, async function (req, res) {
        const take = req.query.take || 10;
        const page = req.query.page || 1;
        const keyword = req.keyword || '';
        const [result, total] = await recruitersRepository.findAndCount({
            where: { name: typeorm_1.Like('%' + keyword + '%') },
            order: { name: 'ASC' },
            take,
            skip: (page - 1) * take
        });
        return res.send({
            data: result,
            count: total,
            countPages: Math.ceil(total / take),
            page
        });
    });
    app.get('/api/recruiters/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        const results = await recruitersRepository.findOne(req.params.id);
        return res.send(results);
    });
    app.post('/api/recruiters', async function (req, res) {
        try {
            const job = await recruitersRepository.create(req.body);
            const results = await recruitersRepository.save(job);
            return res.status(http_status_codes_1.default.OK).send(results);
        }
        catch (error) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).send({ error });
        }
    });
    app.put('/api/recruiters/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        const customer = await recruitersRepository.findOne(req.params.id);
        const _a = req.body, { password } = _a, customerData = __rest(_a, ["password"]);
        recruitersRepository.merge(customer, customerData);
        const results = await recruitersRepository.save(customer);
        return res.send(results);
    });
    app.delete('/api/recruiters/:id', passport_1.default.authenticationMiddleware, async function (req, res) {
        try {
            const results = await recruitersRepository.delete(req.params.id);
            return res.status(http_status_codes_1.default.OK).send(results);
        }
        catch (error) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).send({ error });
        }
    });
};
exports.initRecruiters = initRecruiters;
//# sourceMappingURL=recruiters.js.map