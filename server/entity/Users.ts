import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 45
    })
    index: string;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 500
    })
    descr: string;
}
