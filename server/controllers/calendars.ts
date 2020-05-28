import { Request, Response, Express } from 'express';
import passport from 'passport';
import { Like } from 'typeorm';
import HttpStatus from 'http-status-codes';
import { withSortAndPagination } from '../utils';

const initCalendars = (app: Express, calendarsRepository) => {
	app.get('/api/calendars', passport.authenticationMiddleware, async function(req: any, res: Response) {
		return withSortAndPagination(
			req,
			res,
			calendarsRepository
				.createQueryBuilder('calendars')
				.leftJoinAndSelect('calendars.meeting', 'meeting')
				.leftJoinAndSelect('meeting.interview', 'interview')
				.leftJoinAndSelect('meeting.jobSeeker', 'jobSeeker')
				.leftJoinAndSelect('interview.jobs', 'jobs')
				.leftJoinAndSelect('interview.status', 'status')
				.leftJoinAndSelect('interview.stage', 'stage')
				.leftJoinAndSelect('calendars.recruiter', 'recruiter')
				.leftJoinAndSelect('recruiter.user', 'user'),
			{ name: 'calendars.date', direction: 'DESC' },
			{ query: 'user.id_user = :id', filters: { id: req.user.id_user } }
		);
	});
};

export { initCalendars };
