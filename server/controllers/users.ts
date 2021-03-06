import { Request, Response, Express } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Users } from '../entity/Users';
import HttpStatus from 'http-status-codes';

// Generate Password
const generatePassword = (password) => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);

	return bcrypt.hashSync(password, salt);
};

const initUsers = (app: Express, userRepository) => {
	app.get('/api/users-current', passport.authenticationMiddleware, function(req: any, res: Response) {
		res.json({ user: req.user });
	});

	app.post('/api/users', async function(req: Request, res: Response) {
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
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.put('/api/users/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const user = await userRepository.findOne(req.params.id);
		const { password, ...userData } = req.body;
		userRepository.merge(user, { ...userData, ...password ? generatePassword(password) : {} });
		const results = await userRepository.save(user);
		return res.send(results);
	});

	app.delete('/api/users/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await userRepository.delete(req.params.id);
		return res.send(results);
	});
};

export { initUsers };
