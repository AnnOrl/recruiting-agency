import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { SetQuestions } from './SetQuestions';

@Entity({ name: 'assessment_responses' })
export class AssessmentResponses extends BaseEntity {
	@PrimaryGeneratedColumn() id_assessment_responses: number;

	@Column({
		length: 45
	})
	assessment: string;

	@OneToMany((type) => SetQuestions, (setQuestions) => setQuestions.assessmentResponse, {
		onDelete: 'CASCADE'
	})
	questions: SetQuestions[];
}
