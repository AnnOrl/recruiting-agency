import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Customers } from './Customers';
import { Recruiters } from './Recruiters';

@Entity({ name: 'roles_recruiter' })
export class RolesRecruiter extends BaseEntity {
	@PrimaryGeneratedColumn() id_roles_recruiter: number;

	@Column({
		length: 45
	})
	name: string;

	@OneToMany((type) => Recruiters, (recruiters) => recruiters.role, {
		onDelete: 'CASCADE'
	})
	recruiters: Recruiters[];
}
