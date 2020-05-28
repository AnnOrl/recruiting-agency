import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	OneToMany,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { Jobs } from './Jobs';
import { Recruiters } from './Recruiters';
import { InterviewStage } from './InterviewStage';
import { Meetings } from './Meetings';
import { JobSeekers } from './JobSeekers';
import { InterviewStageStatuses } from './InterviewStageStatuses';

@Entity({ name: 'interviews' })
export class Interviews extends BaseEntity {
	@PrimaryGeneratedColumn() id_interviews: number;

	@ManyToOne((type) => InterviewStage, (interviewStages) => interviewStages.interviews, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_interview_stage' })
	stage: InterviewStage;

	@ManyToOne((type) => InterviewStageStatuses, (interviewStageStatuses) => interviewStageStatuses.interviews, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_interview_stage_status' })
	status: InterviewStageStatuses;

	@ManyToOne((type) => Recruiters, (recruiters) => recruiters.interviews, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_recruiter' })
	recruiter: Recruiters;

	@ManyToOne((type) => Jobs, (jobs) => jobs.interviews, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_job' })
	jobs: Jobs;

	@OneToMany((type) => Meetings, (meetings) => meetings.interview, {
		onDelete: 'CASCADE'
	})
	meetings: Meetings[];

	@ManyToMany((type) => JobSeekers, (jobSeekers) => jobSeekers.interviews)
	@JoinTable({
		name: 'seekers_interviews',
		joinColumn: {
			name: 'id_interviews',
			referencedColumnName: 'id_interviews'
		},
		inverseJoinColumn: {
			name: 'id_job_seekers',
			referencedColumnName: 'id_job_seekers'
		}
	})
	seekers: JobSeekers[];
}
