import { Request, Response, Express } from 'express';
import passport from 'passport';
import HttpStatus from 'http-status-codes';
import { withSortAndPagination } from '../utils';

const initCustomers = (app: Express, customersRepository, customerRepresentativesRepository) => {
	app.get('/api/customers', passport.authenticationMiddleware, async function(req: any, res: Response) {
		return withSortAndPagination(
			req,
			res,
			customersRepository
				.createQueryBuilder('customers')
				.leftJoinAndSelect('customers.customerRepresentatives', 'customerRepresentatives'),
			{ name: 'customers.name', direction: 'ASC' }
		);
	});

	app.get('/api/customers/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await customersRepository.findOne(req.params.id);
		return res.send(results);
	});

	app.post('/api/customers/:id/representatives', passport.authenticationMiddleware, async function(
		req: Request,
		res: Response
	) {
		try {
			const customerRepresentatives = await customerRepresentativesRepository.create({
				...req.body,
				customer: req.params.id
			});
			const results = await customerRepresentativesRepository.save(customerRepresentatives);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.put('/api/customers/representatives/:id', passport.authenticationMiddleware, async function(
		req: Request,
		res: Response
	) {
		const customer = await customerRepresentativesRepository.findOne(req.params.id);
		customerRepresentativesRepository.merge(customer, req.body);
		const results = await customerRepresentativesRepository.save(customer);
		return res.send(results);
	});

	app.delete('/api/customers/representatives/:id', passport.authenticationMiddleware, async function(
		req: Request,
		res: Response
	) {
		try {
			const results = await customerRepresentativesRepository.delete(req.params.id);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
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
		try {
			const results = await customersRepository.delete(req.params.id);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});
};

export { initCustomers };
