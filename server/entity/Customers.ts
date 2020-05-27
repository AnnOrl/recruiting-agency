import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, JoinColumn } from 'typeorm';
import { CustomerRepresentatives } from './CustomerRepresentatives';
import { Jobs } from './Jobs';

@Entity({ name: 'customers' })
export class Customers extends BaseEntity {
	@PrimaryGeneratedColumn() id_customer: number;

	@Column({
		length: 45
	})
	name: string;

	@Column({
		length: 200,
		nullable: true
	})
	mailing_address?: string;

	@Column({
		length: 200,
		nullable: true
	})
	actual_address?: string;

	@Column({
		length: 200,
		nullable: true
	})
	phone?: string;

	@Column({
		length: 200,
		nullable: true
	})
	email?: string;

	@Column({
		length: 12,
		nullable: true
	})
	inn?: string;

	@Column({
		length: 9,
		nullable: true
	})
	kpp?: string;

	@Column({
		length: 45,
		nullable: true
	})
	bank?: string;

	@Column({
		length: 9,
		nullable: true
	})
	bik?: string;

	@Column({
		length: 45,
		nullable: true
	})
	correspondent_account?: string;

	@Column({
		length: 45,
		nullable: true
	})
	checking_account?: string;

	@Column({
		length: 255,
		nullable: true
	})
	comments?: string;

	@OneToMany((type) => CustomerRepresentatives, (customerRepresentatives) => customerRepresentatives.customer, {
		onDelete: 'CASCADE'
	})
	customerRepresentatives: CustomerRepresentatives[];

	@OneToMany((type) => Jobs, (jobs) => jobs.customer, {
		onDelete: 'CASCADE'
	})
	jobs: Jobs[];
}
