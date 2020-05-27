import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Jobs } from './Jobs';
import { Recruiters } from './Recruiters';
import { InterviewStage } from './InterviewStage';
import { Meetings } from './Meetings';

@Entity({ name: 'interviews' })
export class Interviews extends BaseEntity {
	@PrimaryGeneratedColumn() id_interviews: number;

	@ManyToOne((type) => InterviewStage, (interviewStages) => interviewStages.interviews, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_interview_stage' })
	stage: InterviewStage;

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
}
