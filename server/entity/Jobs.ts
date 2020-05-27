import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customers } from './Customers';
import { Grades } from './Grades';
import { Recruiters } from './Recruiters';
import { Interviews } from './Interviews';
import { JobSkills } from './JobSkills';

@Entity({ name: 'jobs' })
export class Jobs extends BaseEntity {
	@PrimaryGeneratedColumn() id_customer_representatives: number;

	@Column({
		length: 45
	})
	name: string;

	@ManyToOne((type) => Customers, (customer) => customer.jobs, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_customer' })
	customer: Customers;

	@ManyToOne((type) => Grades, (grade) => grade.jobs, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_grade' })
	grade: Grades;

	@ManyToOne((type) => Recruiters, (recruiters) => recruiters.jobs, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_recruiter' })
	recruiter: Recruiters;

	@OneToMany((type) => Interviews, (interviews) => interviews.jobs, {
		onDelete: 'CASCADE'
	})
	interviews: Interviews[];

	@OneToMany((type) => JobSkills, (jobSkills) => jobSkills.job, {
		onDelete: 'CASCADE'
	})
	jobSkills: JobSkills[];
}
