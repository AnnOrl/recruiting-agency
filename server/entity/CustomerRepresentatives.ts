import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customers } from './Customers';
import { Jobs } from './Jobs';

@Entity({ name: 'customer_representatives' })
export class CustomerRepresentatives extends BaseEntity {
	@PrimaryGeneratedColumn() id_customer_representatives: number;

	@Column({
		length: 45
	})
	name: string;

	@Column({
		length: 45,
		nullable: true
	})
	phone?: string;

	@Column({
		length: 255,
		nullable: true
	})
	email?: string;

	@ManyToOne((type) => Customers, (customer) => customer.customerRepresentatives, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'id_customer' })
	customer: Customers;

	@OneToMany((type) => Jobs, (jobs) => jobs.customerRepresentatives, {
		onDelete: 'CASCADE'
	})
	jobs: Jobs[];
}
