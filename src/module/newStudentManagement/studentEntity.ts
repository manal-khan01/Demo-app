import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';


@Entity({ name: 'newstudents' })
export class StudentEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    studentId!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({type: 'date', nullable: false})
    dob!: Date;

    @Column({ nullable: false })
    gender!: string;

    @Column({ nullable: false, unique: true })
    email!: string;

    @Column({ nullable: false, unique: true, length: 10 })
    phoneNumber!: string;

    @Column({ nullable: false })
    address!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    createdBy!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ nullable: true })
    updatedBy!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @Column({ nullable: true })
    deletedBy!: string;

    @Column({ type: "timestamp", nullable: true })
    deletedAt!: Date;
}