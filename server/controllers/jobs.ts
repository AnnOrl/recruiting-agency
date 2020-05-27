import { Request, Response, Express } from 'express';
import passport from 'passport';
import { Like } from 'typeorm';
import HttpStatus from 'http-status-codes';

const initJobs = (app: Express, jobsRepository) => {
	app.get('/api/jobs', passport.authenticationMiddleware, async function(req: any, res: Response) {
		const take = req.query.take || 10;
		const page = req.query.page || 1;
		const keyword = req.keyword || '';

		const [ result, total ] = await jobsRepository.findAndCount({
			where: { name: Like('%' + keyword + '%') },
			order: { name: 'ASC' },
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

	app.get('/api/jobs/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await jobsRepository.findOne(req.params.id);
		return res.send(results);
	});

	app.post('/api/jobs', async function(req: Request, res: Response) {
		try {
			const customer = await jobsRepository.create(req.body);
			const results = await jobsRepository.save(customer);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.put('/api/jobs/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const customer = await jobsRepository.findOne(req.params.id);
		const { password, ...customerData } = req.body;
		jobsRepository.merge(customer, customerData);
		const results = await jobsRepository.save(customer);
		return res.send(results);
	});

	app.delete('/api/jobs/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		try {
			const results = await jobsRepository.delete(req.params.id);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});
};

export { initJobs };
