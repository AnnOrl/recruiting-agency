import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Jobs } from './Jobs';
import { JobSeekers } from './JobSeekers';

@Entity({ name: 'grades' })
export class Grades extends BaseEntity {
	@PrimaryGeneratedColumn() id_grade: number;

	@Column({
		length: 45
	})
	grade_name: string;

	@OneToMany((type) => Jobs, (jobs) => jobs.grade, {
		onDelete: 'CASCADE'
	})
	jobs: Jobs[];

	@OneToMany((type) => JobSeekers, (jobSeekers) => jobSeekers.confirmedGrade, {
		onDelete: 'CASCADE'
	})
	jobSeekersConfirmed: JobSeekers[];

	@OneToMany((type) => JobSeekers, (jobSeekers) => jobSeekers.prevGrade, {
		onDelete: 'CASCADE'
	})
	jobSeekersPrev: JobSeekers[];
}
