import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Recruiters } from './Recruiters';

@Entity()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn() id_user: number;

	@Column({
		length: 45
	})
	email: string;

	@Column({
		length: 20,
		unique: true
	})
	login: string;

	@Column({
		length: 255
	})
	passwordHash: string;

	@Column({
		length: 200
	})
	name: string;

	@Column() role: number;

	@OneToOne((type) => Recruiters, (recruiters) => recruiters.user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_recruiters' })
	recruiter: Recruiters;
}
