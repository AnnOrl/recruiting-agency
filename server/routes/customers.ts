import { Request, Response, Express } from 'express';
import passport from 'passport';
import { Like } from 'typeorm';
import HttpStatus from 'http-status-codes';

const initCustomers = (app: Express, customersRepository) => {
	app.get('/api/customers', passport.authenticationMiddleware, async function(req: any, res: Response) {
		const take = req.query.take || 10;
		const page = req.query.page || 1;
		const keyword = req.keyword || '';

		const [ result, total ] = await customersRepository.findAndCount({
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

	app.get('/api/customers/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await customersRepository.findOne(req.params.id);
		return res.send(results);
	});

	app.post('/api/customers', async function(req: Request, res: Response) {
		try {
			const customer = await customersRepository.create(req.body);
			const results = await customersRepository.save(customer);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.put('/api/customers/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const customer = await customersRepository.findOne(req.params.id);
		const { password, ...customerData } = req.body;
		customersRepository.merge(customer, customerData);
		const results = await customersRepository.save(customer);
		return res.send(results);
	});

	app.delete('/api/customers/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await customersRepository.delete(req.params.id);
		return res.send(results);
	});
};

export { initCustomers };
