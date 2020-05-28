import { Request, Response, Express } from 'express';
import passport from 'passport';
import HttpStatus from 'http-status-codes';
import { withSortAndPagination } from '../utils';

const initSeekers = (app: Express, seekersRepository) => {
	app.get('/api/seekers', passport.authenticationMiddleware, async function(req: any, res: Response) {
		return withSortAndPagination(
			req,
			res,
			seekersRepository
				.createQueryBuilder('seekers')
				.leftJoinAndSelect('seekers.confirmedGrade', 'confirmedGrade')
				.leftJoinAndSelect('seekers.skills', 'skills')
				.leftJoinAndSelect('seekers.prevGrade', 'prevGrade'),
			{ name: 'seekers.name', direction: 'ASC' }
		);
	});

	app.get('/api/seekers/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await seekersRepository.findOne(req.params.id);
		return res.send(results);
	});

	app.get('/api/seekers/print/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		try {
			const { cv: file } = await seekersRepository.findOne(req.params.id);
			res.setHeader('Content-Length', file.length);
			res.write(file, 'binary');
			res.end();
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.post('/api/seekers', async function(req: Request, res: Response) {
		try {
			const customer = await seekersRepository.create(req.body);
			const results = await seekersRepository.save(customer);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.put('/api/seekers/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const customer = await seekersRepository.findOne(req.params.id);
		const { password, ...customerData } = req.body;
		seekersRepository.merge(customer, customerData);
		const results = await seekersRepository.save(customer);
		return res.send(results);
	});

	app.delete('/api/seekers/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		try {
			const results = await seekersRepository.delete(req.params.id);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});
};

export { initSeekers };
