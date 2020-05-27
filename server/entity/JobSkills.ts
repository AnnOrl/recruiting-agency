import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Interviews } from './Interviews';
import { Skills } from './Skills';
import { Jobs } from './Jobs';

@Entity({ name: 'job_skills' })
export class JobSkills extends BaseEntity {
	@PrimaryGeneratedColumn() id_job_skills: number;

	@ManyToOne((type) => Skills, (skills) => skills.jobSkills, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_skill' })
	skill: Skills;

	@ManyToOne((type) => Jobs, (jobs) => jobs.jobSkills, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_job' })
	job: Skills;
}
