import sequelize, { Model, CreationOptional } from "sequelize";
import { databaseInstance } from "../../database/mysql/connection";



export interface StudentAttributes {

    studentId?: number,
    name: string,
    dob: Date,
    gender: string,
    email: string,
    phoneNumber: string,
    address: string,
    description: string,
    createdBy?: string,
    createdAt?: Date,
    updatedBy?: string,
    updatedAt?: Date,
    deletedBy?: string,
    deletedAt?: Date,
}

export class Student extends Model<StudentAttributes> {
    declare studentId: number;
    declare name: string;
    declare dob: Date;
    declare gender: string;
    declare email: string;
    declare phoneNumber: string;
    declare address: string;
    declare description: CreationOptional<string>;
    declare createdBy: CreationOptional<string>;
    declare createdAt: string;
    declare updatedBy: CreationOptional<string>;
    declare updatedAt: CreationOptional<string>;
    declare deletedBy: CreationOptional<string>;
    declare deletedAt: CreationOptional<string>;

}

Student.init(
    {
        studentId: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: sequelize.DATEONLY,
            allowNull: false
        },
        gender: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            unique: true,
            allowNull: false
        },
        phoneNumber: {
            type: sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        address: {
            type: sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize.STRING,
            allowNull: true
        },
        createdBy: {
            type: sequelize.UUID,
            allowNull: true,
        },
        createdAt: {
            type: sequelize.DATE,
            allowNull: false,
        },
        updatedBy: {
            type: sequelize.UUID,
            allowNull: true,
        },
        updatedAt: {
            type: sequelize.DATE,
            allowNull: true
        },
        deletedBy: {
            type: sequelize.UUID,
            allowNull: true,
        },
        deletedAt: {
            type: sequelize.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "students",
        freezeTableName: false,
        timestamps: true,
        paranoid: true,
        sequelize: databaseInstance,
    }
);

export default Student;