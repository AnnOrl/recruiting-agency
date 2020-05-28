import { Request, Response, Express } from 'express';
import passport from 'passport';
import { Like } from 'typeorm';
import HttpStatus from 'http-status-codes';

const initRecruiters = (app: Express, recruitersRepository) => {
	app.get('/api/recruiters', passport.authenticationMiddleware, async function(req: any, res: Response) {
		const take = req.query.take || 10;
		const page = req.query.page || 1;
		const keyword = req.keyword || '';

		const [ result, total ] = await recruitersRepository.findAndCount({
			where: { name: Like('%' + keyword + '%') },
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

	app.get('/api/recruiters/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await recruitersRepository.findOne(req.params.id);
		return res.send(results);
	});

	app.post('/api/recruiters', async function(req: Request, res: Response) {
		try {
			const job = await recruitersRepository.create(req.body);
			const results = await recruitersRepository.save(job);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.put('/api/recruiters/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const customer = await recruitersRepository.findOne(req.params.id);
		const { password, ...customerData } = req.body;
		recruitersRepository.merge(customer, customerData);
		const results = await recruitersRepository.save(customer);
		return res.send(results);
	});

	app.delete('/api/recruiters/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		try {
			const results = await recruitersRepository.delete(req.params.id);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});
};

export { initRecruiters };
