import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { JobSeekers } from './JobSeekers';
import { Jobs } from './Jobs';

@Entity({ name: 'skills' })
export class Skills extends BaseEntity {
	@PrimaryGeneratedColumn() id_skill: number;

	@Column({
		length: 45
	})
	name: string;

	@ManyToMany((type) => Jobs, (jobs) => jobs.skills)
	@JoinTable({
		name: 'job_skills',
		joinColumn: {
			name: 'id_skills',
			referencedColumnName: 'id_skill'
		},
		inverseJoinColumn: {
			name: 'id_job',
			referencedColumnName: 'id_job'
		}
	})
	jobs: Jobs[];

	@ManyToMany((type) => JobSeekers, (jobSeekers) => jobSeekers.skills)
	@JoinTable({
		name: 'seekers_skills',
		joinColumn: {
			name: 'id_skills',
			referencedColumnName: 'id_skill'
		},
		inverseJoinColumn: {
			name: 'id_job_seekers',
			referencedColumnName: 'id_job_seekers'
		}
	})
	seekers: JobSeekers[];
}
