import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Interviews } from './Interviews';
import { Jobs } from './Jobs';
import { SeekersSkills } from './SeekersSkills';
import { JobSkills } from './JobSkills';

@Entity({ name: 'skills' })
export class Skills extends BaseEntity {
	@PrimaryGeneratedColumn() id_skill: number;

	@Column({
		length: 45
	})
	name: string;

	@OneToMany((type) => SeekersSkills, (seekersSkills) => seekersSkills.skill, {
		onDelete: 'CASCADE'
	})
	seekersSkills: SeekersSkills[];

	@OneToMany((type) => JobSkills, (jobSkills) => jobSkills.skill, {
		onDelete: 'CASCADE'
	})
	jobSkills: JobSkills[];
}
