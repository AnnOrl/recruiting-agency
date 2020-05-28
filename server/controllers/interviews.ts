import { Request, Response, Express } from 'express';
import passport from 'passport';
import { Like } from 'typeorm';
import HttpStatus from 'http-status-codes';
import { withSortAndPagination } from '../utils';

const initInterviews = (app: Express, interviewsRepository) => {
	app.get('/api/interviews', passport.authenticationMiddleware, async function(req: any, res: Response) {
		return withSortAndPagination(
			req,
			res,
			interviewsRepository
				.createQueryBuilder('interviews')
				.leftJoinAndSelect('interviews.meetings', 'meetings')
				.leftJoinAndSelect('interviews.recruiter', 'recruiter')
				.leftJoinAndSelect('interviews.jobs', 'jobs')
				.leftJoinAndSelect('interviews.stage', 'stage')
				.leftJoinAndSelect('interviews.status', 'status'),
			{
				name: 'meetings.date',
				direction: 'DESC'
			}
		);
	});

	app.get('/api/interviews/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await interviewsRepository.findOne(req.params.id);
		return res.send(results);
	});

	app.post('/api/interviews', async function(req: Request, res: Response) {
		try {
			const job = await interviewsRepository.create(req.body);
			const results = await interviewsRepository.save(job);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.put('/api/interviews/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const customer = await interviewsRepository.findOne(req.params.id);
		const { password, ...customerData } = req.body;
		interviewsRepository.merge(customer, customerData);
		const results = await interviewsRepository.save(customer);
		return res.send(results);
	});

	app.delete('/api/interviews/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		try {
			const results = await interviewsRepository.delete(req.params.id);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});
};

export { initInterviews };
