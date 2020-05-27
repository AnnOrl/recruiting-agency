import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Interviews } from './Interviews';
import { Jobs } from './Jobs';
import { Questions } from './Questions';

@Entity({ name: 'questions_sub_category' })
export class QuestionsSubCategory extends BaseEntity {
	@PrimaryGeneratedColumn() id_questions_sub_category: number;

	@Column({
		length: 45
	})
	name: string;

	@OneToMany((type) => Questions, (questions) => questions.subCategory, {
		onDelete: 'CASCADE'
	})
	questions: Questions[];
}
