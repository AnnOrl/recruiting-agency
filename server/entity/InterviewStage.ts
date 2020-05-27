import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customers } from './Customers';
import { InterviewStageStatuses } from './InterviewStageStatuses';
import { Interviews } from './Interviews';

@Entity({ name: 'interview_stage' })
export class InterviewStage extends BaseEntity {
	@PrimaryGeneratedColumn() id_interview_stage: number;

	@Column({
		length: 45
	})
	stage_name: string;

	@ManyToOne((type) => InterviewStageStatuses, (interviewStageStatuses) => interviewStageStatuses.stages, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_interview_stage_status' })
	status: InterviewStageStatuses;

	@OneToMany((type) => Interviews, (interviews) => interviews.stage, {
		onDelete: 'CASCADE'
	})
	interviews: Interviews[];
}
