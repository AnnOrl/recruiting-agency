import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Customers } from './Customers';

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

	@ManyToOne((type) => Customers, (customer) => customer.customerRepresentatives)
	customer: Customers;
}
