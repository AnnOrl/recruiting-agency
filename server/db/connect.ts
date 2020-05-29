import { createConnection } from 'typeorm';
import {
	AssessmentResponses,
	CustomerRepresentatives,
	Customers,
	Grades,
	Interviews,
	InterviewStage,
	InterviewStageStatuses,
	Jobs,
	JobSeekers,
	Meetings,
	Questions,
	QuestionsCategory,
	QuestionsSubCategory,
	Recruiters,
	RolesRecruiter,
	SetQuestions,
	Skills,
	Users,
	Calendar
} from '../entity';

export const initConnection = () => {
	return createConnection({
		name: 'recruting_agency',
		type: 'mysql',
		host: '127.0.0.1',
		port: 3306,
		username: 'root',
		password: '1111',
		database: 'recruting_agency',
		synchronize: true,
		logging: 'all',
		entities: [
			Users,
			Customers,
			CustomerRepresentatives,
			Jobs,
			Recruiters,
			RolesRecruiter,
			Grades,
			Interviews,
			InterviewStage,
			InterviewStageStatuses,
			JobSeekers,
			Skills,
			AssessmentResponses,
			Meetings,
			Questions,
			QuestionsCategory,
			QuestionsSubCategory,
			SetQuestions,
			Calendar
		]
	});
};
