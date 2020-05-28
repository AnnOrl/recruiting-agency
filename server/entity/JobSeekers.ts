import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	OneToMany,
	ManyToOne,
	JoinColumn,
	ManyToMany
} from 'typeorm';
import { Skills } from './Skills';
import { Grades } from './Grades';
import { Interviews } from './Interviews';
import { Meetings } from './Meetings';

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

	@Column({ type: 'longblob' })
	cv;

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

	@ManyToMany((type) => Skills, (skills) => skills.seekers)
	@JoinColumn({ name: 'id_job_seekers' })
	skills: Skills[];

	@ManyToMany((type) => Interviews, (interviews) => interviews.seekers)
	@JoinColumn({ name: 'id_job_seekers' })
	interviews: Interviews[];

	@OneToMany((type) => Meetings, (meetings) => meetings.jobSeeker, {
		onDelete: 'CASCADE'
	})
	meetings: Meetings[];
}
