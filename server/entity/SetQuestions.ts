import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Meetings } from './Meetings';
import { Questions } from './Questions';
import { AssessmentResponses } from './AssessmentResponses';

@Entity({ name: 'set_questions' })
export class SetQuestions extends BaseEntity {
	@PrimaryGeneratedColumn() id_set_questions: number;

	@ManyToOne((type) => Meetings, (meetings) => meetings.questions, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_meetings' })
	meeting: Meetings;

	@ManyToOne((type) => Questions, (questions) => questions.setQuestions, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_question' })
	questions: Questions;

	@ManyToOne((type) => AssessmentResponses, (assessmentResponses) => assessmentResponses.questions, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_assessment' })
	assessmentResponse: AssessmentResponses;
}
