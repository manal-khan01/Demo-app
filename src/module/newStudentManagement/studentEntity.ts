import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';



@Entity({ name: 'newstudents' })
export class StudentEntity {
    @PrimaryGeneratedColumn({type: 'int'})
    studentId!: string;

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

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Date;

    @Column({ nullable: true })
    updatedBy!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt!: Date;

    @Column({ nullable: true })
    deletedBy!: string;

    @Column({ nullable: true })
    deletedAt!: Date;
}