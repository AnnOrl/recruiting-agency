import 'reflect-metadata';

import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import next from 'next';
import { Users } from './entity/Users';

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
			entities: [ Users ]
		})
	)
	.then((connection) => {
		console.log('!!!!!', connection);
		const userRepository = connection.getRepository(Users);

		// create and setup express app
		const server = express();
		server.use(bodyParser.json());

		// register routes

		server.get('/api/users', async function(_req: Request, res: Response) {
			const users = await userRepository.find();
			res.json(users);
		});

		server.all('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(process.env.PORT || 3000);
	})
	.catch((error) => console.log(error));
