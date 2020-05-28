import { Request, Response, Express } from 'express';
import passport from 'passport';
import { Like, Repository } from 'typeorm';
import HttpStatus from 'http-status-codes';
import { Skills, Jobs } from '../entity';
import { withSortAndPagination } from '../utils';

const initJobs = (app: Express, jobsRepository: Repository<Jobs>) => {
	app.get('/api/jobs', passport.authenticationMiddleware, async function(req: any, res: Response) {
		return withSortAndPagination(
			req,
			res,
			jobsRepository
				.createQueryBuilder('jobs')
				.leftJoinAndSelect('jobs.customer', 'customers')
				.leftJoinAndSelect('jobs.customerRepresentatives', 'customerRepresentatives')
				.leftJoinAndSelect('jobs.grade', 'grade')
				.leftJoinAndSelect('jobs.recruiter', 'recruiter')
				.leftJoinAndSelect('jobs.skills', 'skills')
				.leftJoinAndSelect('jobs.interviews', 'interviews'),
			{ name: 'jobs.name', direction: 'ASC' }
		);
	});

	app.get('/api/jobs/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await jobsRepository.findOne(req.params.id);
		return res.send(results);
	});

	app.post('/api/jobs', async function(req: Request, res: Response) {
		try {
			const job = await jobsRepository.create(req.body);
			const results = await jobsRepository.save(job);
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
