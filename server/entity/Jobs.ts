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
import { Customers } from './Customers';
import { Grades } from './Grades';
import { Recruiters } from './Recruiters';
import { Interviews } from './Interviews';
import { Skills } from './Skills';
import { CustomerRepresentatives } from './CustomerRepresentatives';

@Entity({ name: 'jobs' })
export class Jobs extends BaseEntity {
	@PrimaryGeneratedColumn() id_job: number;

	@Column({
		length: 45
	})
	name: string;

	@ManyToOne((type) => Customers, (customer) => customer.jobs, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_customer' })
	customer: Customers;

	@ManyToOne((type) => CustomerRepresentatives, (customerRepresentatives) => customerRepresentatives.jobs, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_customer_representatives' })
	customerRepresentatives: CustomerRepresentatives;

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

	@ManyToMany((type) => Skills, (skills) => skills.jobs)
	@JoinColumn({ name: 'id_job' })
	skills: Skills[];
}
