import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Meetings } from './Meetings';
import { Skills } from './Skills';
import { Recruiters } from './Recruiters';

@Entity({ name: 'calendar' })
export class Calendar extends BaseEntity {
	@PrimaryGeneratedColumn() id_calendar: number;

	@Column({
		length: 45
	})
	date: string;

	@Column({
		length: 200
	})
	description: string;

	@ManyToOne((type) => Meetings, (meeting) => meeting.calendar, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_meeting' })
	meeting: Meetings;

	@ManyToOne((type) => Recruiters, (recruiters) => recruiters.calendar, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_recruiter' })
	recruiter: Recruiters;
}
