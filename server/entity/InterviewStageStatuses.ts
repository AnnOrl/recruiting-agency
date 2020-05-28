import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Customers } from './Customers';
import { Interviews } from './Interviews';
import { InterviewStage } from './InterviewStage';

@Entity({ name: 'interview_stage_statuses' })
export class InterviewStageStatuses extends BaseEntity {
	@PrimaryGeneratedColumn() id_interview_stage_status: number;

	@Column({
		length: 45
	})
	name: string;

	@OneToMany((type) => Interviews, (interview) => interview.status, {
		onDelete: 'CASCADE'
	})
	interviews: Interviews[];
}
