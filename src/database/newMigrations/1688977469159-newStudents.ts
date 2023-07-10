import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class NewStudents1688977469159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: 'newstudents',
                    columns: [
                        {
                            name: 'studentId',
                            type: 'int',
                            isPrimary: true,
                            isNullable: false,
                            isUnique: true,
                            isGenerated: true,
                            generationStrategy: 'increment'
                        },
                        {
                            name: 'name',
                            type: 'string',
                            isNullable: false
                        },
                        {
                            name: 'dob',
                            type: 'date',
                            isNullable: false
                        },
                        {
                            name: 'gender',
                            type: 'string',
                            isNullable: false
                        },
                        {
                            name: 'email',
                            type: 'string',
                            isNullable: false
                        },
                        {
                            name: 'phoneNumber',
                            type: 'string',
                            isNullable: false
                        },
                        {
                            name: 'address',
                            type: 'string',
                            isNullable: false
                        },
                        {
                            name: 'description',
                            type: 'string',
                            isNullable: true
                        },
                        {
                            name: 'createdBy',
                            type: 'string',
                            isNullable: true
                        },
                        {
                            name: 'createdAt',
                            type: 'datetime',
                            default: 'CURRENT_TIMESTAMP',
                            isNullable: false
                        },
                        {
                            name: 'updatedBy',
                            type: 'string',
                            isNullable: true
                        },
                        {
                            name: 'updatedAt',
                            type: 'datetime',
                            default: 'CURRENT_TIMESTAMP',
                            isNullable: false
                        },
                        {
                            name: 'deletedBy',
                            type: 'string',
                            isNullable: true
                        },
                        {
                            name: 'deletedAt',
                            type: 'datetime',
                            isNullable: true
                        },
                    ],
                })
            );
            console.log("Migration run successfully (newstudents).")
        }
        catch (error: any) {
            console.error("Error in running migrations (newstudents)", error)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('newstudents');
    }

}
