import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';



@Entity({ name: 'newstudents' })
export class StudentEntity {
    @PrimaryGeneratedColumn()
    studentId!: number;

    @Column()
    name!: string;

    @Column()
    dob!: Date;

    @Column()
    gender!: string;

    @Column()
    email!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    address!: string;

    @Column()
    description!: string;

    @Column()
    createdBy!: string;

    @Column()
    createdAt!: Date;

    @Column()
    updatedBy!: string;

    @Column()
    updatedAt!: Date;

    @Column()
    deletedBy!: string;

    @Column()
    deletedAt!: Date;
}