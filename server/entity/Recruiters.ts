import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Interviews } from './Interviews';
import { Jobs } from './Jobs';
import { RolesRecruiter } from './RolesRecruiter';
import { Calendar } from './Calendar';

@Entity({ name: 'recruiters' })
export class Recruiters extends BaseEntity {
	@PrimaryGeneratedColumn() id_recruiter: number;

	@Column({
		length: 45
	})
	name: string;

	@Column({
		length: 45
	})
	phone: string;

	@Column({
		length: 45
	})
	email: string;

	@OneToMany((type) => Jobs, (jobs) => jobs.recruiter, {
		onDelete: 'CASCADE'
	})
	jobs: Jobs[];

	@ManyToOne((type) => RolesRecruiter, (roles_recruiter) => roles_recruiter.recruiters, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_roles_recruiter' })
	role: RolesRecruiter;

	@OneToMany((type) => Interviews, (interviews) => interviews.recruiter, {
		onDelete: 'CASCADE'
	})
	interviews: Interviews[];

	@OneToMany((type) => Calendar, (calendar) => calendar.recruiter, {
		onDelete: 'CASCADE'
	})
	calendar: Calendar[];
}
