import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Interviews } from './Interviews';
import { SeekersSkills } from './SeekersSkills';
import { Grades } from './Grades';

@Entity({ name: 'job_seekers' })
export class JobSeekers extends BaseEntity {
	@PrimaryGeneratedColumn() id_job_seekers: number;

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

	@Column() cv: string;

	@ManyToOne((type) => Grades, (grades) => grades.jobSeekersConfirmed, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_confirmed_grade' })
	confirmedGrade: Grades;

	@ManyToOne((type) => Grades, (grades) => grades.jobSeekersPrev, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_prev_grade' })
	prevGrade: Grades;

	@OneToMany((type) => SeekersSkills, (seekersSkills) => seekersSkills.jobSeekers, {
		onDelete: 'CASCADE'
	})
	skills: SeekersSkills[];
}
