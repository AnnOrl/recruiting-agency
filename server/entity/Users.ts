import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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
}
