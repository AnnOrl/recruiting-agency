import { Request, Response, Express } from 'express';
import passport from 'passport';
import { Like } from 'typeorm';
import HttpStatus from 'http-status-codes';
import { withSortAndPagination } from '../utils';

const initMeetings = (app: Express, meetingsRepository) => {
	app.get('/api/meetings', passport.authenticationMiddleware, async function(req: any, res: Response) {
		return withSortAndPagination(
			req,
			res,
			meetingsRepository
				.createQueryBuilder('meetings')
				.leftJoinAndSelect('meetings.interview', 'interview')
				.leftJoinAndSelect('interview.recruiter', 'recruiter')
				.leftJoinAndSelect('interview.jobs', 'jobs')
				.leftJoinAndSelect('interview.stage', 'stage')
				.leftJoinAndSelect('interview.status', 'status')
				.leftJoinAndSelect('meetings.calendar', 'calendar')
				.leftJoinAndSelect('meetings.questions', 'questions'),
			{ name: 'meetings.date', direction: 'DESC' }
		);
	});

	app.get('/api/meetings/current', passport.authenticationMiddleware, async function(req: any, res: Response) {
		return withSortAndPagination(
			req,
			res,
			meetingsRepository
				.createQueryBuilder('meetings')
				.leftJoinAndSelect('meetings.interview', 'interview')
				.leftJoinAndSelect('interview.recruiter', 'recruiter')
				.leftJoinAndSelect('recruiter.user', 'user')
				.leftJoinAndSelect('interview.jobs', 'jobs')
				.leftJoinAndSelect('interview.stage', 'stage')
				.leftJoinAndSelect('interview.status', 'status')
				.leftJoinAndSelect('meetings.calendar', 'calendar')
				.leftJoinAndSelect('calendar.recruiter', 'recruiter')
				.leftJoinAndSelect('meetings.questions', 'questions'),
			{ name: 'meetings.date', direction: 'DESC' },
			{ query: 'user.id_user = :id', filters: { id: req.user.id_user } }
		);
	});

	app.get('/api/meetings/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const results = await meetingsRepository.findOne(req.params.id);
		return res.send(results);
	});

	app.post('/api/meetings', async function(req: Request, res: Response) {
		try {
			const job = await meetingsRepository.create(req.body);
			const results = await meetingsRepository.save(job);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});

	app.put('/api/meetings/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		const customer = await meetingsRepository.findOne(req.params.id);
		const { password, ...customerData } = req.body;
		meetingsRepository.merge(customer, customerData);
		const results = await meetingsRepository.save(customer);
		return res.send(results);
	});

	app.delete('/api/meetings/:id', passport.authenticationMiddleware, async function(req: Request, res: Response) {
		try {
			const results = await meetingsRepository.delete(req.params.id);
			return res.status(HttpStatus.OK).send(results);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send({ error });
		}
	});
};

export { initMeetings };
