import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Questions } from './Questions';

@Entity({ name: 'questions_category' })
export class QuestionsCategory extends BaseEntity {
	@PrimaryGeneratedColumn() id_questions_category: number;

	@Column({
		length: 45
	})
	name: string;

	@OneToMany((type) => Questions, (questions) => questions.category, {
		onDelete: 'CASCADE'
	})
	questions: Questions[];
}
