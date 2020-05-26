import 'reflect-metadata';
import passport from 'passport';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import redis from 'redis';
import connectRedis from 'connect-redis';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import next from 'next';
import { Users } from './entity/Users';
import { Customers } from './entity/Customers';
import { CustomerRepresentatives } from './entity/CustomerRepresentatives';
import { config } from './config';
import { initPassport } from './auth/authentication';
import { initUsers } from './routes/users';
import { initLogin } from './routes/login';
import { initCustomers } from './routes/customers';

const redisClient = redis.createClient();
const RedisStore = connectRedis(session);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
	.prepare()
	.then(() =>
		createConnection({
			name: 'recruting_agency',
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'root',
			password: '1111',
			database: 'recruting_agency',
			synchronize: true,
			logging: false,
			entities: [ Users, Customers, CustomerRepresentatives ]
		})
	)
	.then((connection) => {
		// create and setup express app
		const server = express();
		server.use(
			bodyParser.urlencoded({
				extended: true
			})
		);
		server.use(bodyParser.json());
		server.use(cookieParser());
		server.use(
			cookieSession({
				name: 'session',
				keys: [ 'session' ]
			})
		);

		initPassport(connection);
		server.use(
			session({
				store: new RedisStore({
					client: redisClient,
					url: config.redisStore.url
				}),
				secret: config.redisStore.secret,
				resave: false,
				saveUninitialized: false
			})
		);

		server.use(passport.initialize());
		server.use(passport.session());

		initLogin(server);
		initUsers(server, connection.getRepository(Users));
		initCustomers(server, connection.getRepository(Customers), connection.getRepository(CustomerRepresentatives));

		server.all('/', passport.redirectMiddleware, (req, res) => handle(req, res));
		server.all('/login', (req, res) => handle(req, res));
		server.all('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(process.env.PORT || 3000);
	})
	.catch((error) => console.log(error));
