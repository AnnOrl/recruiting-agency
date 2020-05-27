import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Interviews } from './Interviews';
import { Skills } from './Skills';
import { JobSeekers } from './JobSeekers';

@Entity({ name: 'seekers_skills' })
export class SeekersSkills extends BaseEntity {
	@PrimaryGeneratedColumn() id_seekers_skills: number;

	@ManyToOne((type) => JobSeekers, (jobSeekers) => jobSeekers.skills, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_job_seekers' })
	jobSeekers: JobSeekers;

	@ManyToOne((type) => Skills, (skills) => skills.seekersSkills, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_skill' })
	skill: Skills;
}
