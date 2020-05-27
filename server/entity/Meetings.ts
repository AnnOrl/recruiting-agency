import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Interviews } from './Interviews';
import { SetQuestions } from './SetQuestions';
import { Calendar } from './Calendar';

@Entity({ name: 'meetings' })
export class Meetings extends BaseEntity {
	@PrimaryGeneratedColumn() id_meetings: number;

	@Column({
		length: 45
	})
	date: string;

	@ManyToOne((type) => Interviews, (interviews) => interviews.meetings, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_interview' })
	interview: Interviews;

	@OneToMany((type) => SetQuestions, (setQuestions) => setQuestions.meeting, {
		onDelete: 'CASCADE'
	})
	questions: SetQuestions[];

	@OneToMany((type) => Calendar, (calendar) => calendar.meeting, {
		onDelete: 'CASCADE'
	})
	calendar: Calendar[];
}
