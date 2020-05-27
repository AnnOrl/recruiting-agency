import bodyParser from 'body-parser';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import session from 'express-session';
import next from 'next';
import passport from 'passport';
import redis from 'redis';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { initPassport } from './auth/authentication';
import { config } from './config';
import {
	AssessmentResponses,
	CustomerRepresentatives,
	Customers,
	Grades,
	Interviews,
	InterviewStage,
	InterviewStageStatuses,
	Jobs,
	JobSeekers,
	Meetings,
	Questions,
	QuestionsCategory,
	QuestionsSubCategory,
	Recruiters,
	RolesRecruiter,
	SeekersSkills,
	SetQuestions,
	Skills,
	Users,
	JobSkills,
	Calendar
} from './entity';
import { initRoutes } from './routes';

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
			entities: [
				Users,
				Customers,
				CustomerRepresentatives,
				Jobs,
				Recruiters,
				RolesRecruiter,
				Grades,
				Interviews,
				InterviewStage,
				InterviewStageStatuses,
				JobSeekers,
				SeekersSkills,
				Skills,
				AssessmentResponses,
				Meetings,
				Questions,
				QuestionsCategory,
				QuestionsSubCategory,
				SetQuestions,
				JobSkills,
				Calendar
			]
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

		initRoutes(server, connection);

		server.all('/', passport.redirectMiddleware, (req, res) => handle(req, res));
		server.all('/login', (req, res) => handle(req, res));
		server.all('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(process.env.PORT || 3000);
	})
	.catch((error) => console.log(error));
