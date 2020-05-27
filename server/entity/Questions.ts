import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { QuestionsCategory } from './QuestionsCategory';
import { QuestionsSubCategory } from './QuestionsSubCategory';
import { SetQuestions } from './SetQuestions';

@Entity({ name: 'questions' })
export class Questions extends BaseEntity {
	@PrimaryGeneratedColumn() id_question: number;

	@Column({
		length: 200
	})
	description: string;

	@ManyToOne((type) => QuestionsCategory, (questionsCategory) => questionsCategory.questions, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_questions_category' })
	category: QuestionsCategory;

	@ManyToOne((type) => QuestionsSubCategory, (questionsSubCategory) => questionsSubCategory.questions, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_questions_sub_category' })
	subCategory: QuestionsSubCategory;

	@OneToMany((type) => SetQuestions, (setQuestions) => setQuestions.questions, {
		onDelete: 'CASCADE'
	})
	setQuestions: SetQuestions[];
}
