import { paginator } from '../../common/pagination/pagination';
import Student, { StudentAttributes } from './studentModel';
import Exception from './utils/exception'
import { Op } from "sequelize";


class StudentService {
    constructor() {
        this.readOne = this.readOne.bind(this)
        this.readAll = this.readAll.bind(this)
        this.create = this.create.bind(this)
        this.delete = this.delete.bind(this)
        this.update = this.update.bind(this)
    }

    async readOne(params: any, reqQuery: any) {
        try {

            let studentId = params?.studentId;
            let result = await Student.findByPk(studentId);

            if (!result) {
                throw new Exception(
                    'NOT_FOUND',
                    `Student with id ${studentId} does not exist.`
                );
            }
            console.log('fetched student by id successfully')
            return Promise.resolve(result);

        }
        catch (error: any) {
            console.error('error in fetching student by id')
            return Promise.reject(error);
        }
    }

    async readAll(params: any, reqQuery: any) {
        try {
            let {
                name,
                dob,
                gender,
                email,
                phoneNumber,
                address,
                page,
                limit,
                sortBy,
                sortOrder,
                search
            } = reqQuery

            let paginatorBody = {
                page,
                limit,
                sortBy,
                sortOrder,
                search
            }

            /**
             * applying pagination as per query params
             */
            let query = paginator(paginatorBody, ['name', 'dob', 'gender', 'email', 'phoneNumber', 'address'])
            if (undefined == sortBy) { sortBy = 'name' }
            if (undefined == sortOrder) { sortOrder = 'ASC' }
            query.order = [[String(sortBy), String(sortOrder)]]

            let where = {}

            /**
           * applying where params as per fields passed in query params for search filters 
           */
            if (name != undefined) {
                where = {
                    ...where,
                    name: {
                        [Op.eq]: name
                    }
                }
            }

            if (dob != undefined) {
                where = {
                    ...where,
                    dob: {
                        [Op.eq]: dob
                    }
                }
            }

            if (gender != undefined) {
                where = {
                    ...where,
                    gender: {
                        [Op.eq]: gender
                    }
                }
            }

            if (email != undefined) {
                where = {
                    ...where,
                    email: {
                        [Op.eq]: email
                    }
                }
            }

            if (phoneNumber != undefined) {
                where = {
                    ...where,
                    phoneNumber: {
                        [Op.eq]: phoneNumber
                    }
                }
            }

            if (address != undefined) {
                where = {
                    ...where,
                    address: {
                        [Op.eq]: address
                    }
                }
            }

            /**
             * querying for fetching the list of all campaigns
             */
            var listOfStudents: any = await Student.findAndCountAll({
                where: {
                    ...query.where,
                    ...where
                },
                limit: query.limit,
                distinct: true,
                offset: query.offset,
                order: query.order,
            })

            console.log('list of all students fetched successfully');
            return Promise.resolve(listOfStudents)
        }
        catch (error: any) {
            console.error('error in fetching students list');
            return Promise.reject(error);
        }
    }

    async create(params: any, query: any, body: any) {
        try {

            let studentBody: StudentAttributes = {
                name: body?.name,
                dob: body?.dob,
                gender: body?.gender,
                email: body?.email,
                phoneNumber: body?.phoneNumber,
                address: body?.address,
                description: body?.description,
                createdBy: body?.createdBy,

            }

            let newStudent = await Student.create(studentBody)
            console.log('Student been created successfully')
            return Promise.resolve(newStudent);
        }
        catch (error: any) {
            console.error('error in creating student');
            return Promise.reject(error);
        }
    }

    async delete(params: any, query: any) {
        try {
            let studentId = params?.studentId
            // checking if student with given studentId exists or not 
            let studentExist = await Student.findOne({ where: { studentId: studentId } })
            if (!studentExist) {
                throw new Exception(
                    'NOT_FOUND',
                    `Student with id ${studentId} does not exist.`
                );
            }


            //query for deleting student by studentId
            let deleteCampaign = await Student.destroy({ where: { studentId: studentId } })
            console.log('student deleted successfully')
            return Promise.resolve("student deleted successfully");
        }
        catch (error: any) {
            console.error('error in deleting student');
            return Promise.reject(error);
        }
    }

    async update(params: any, query: any, body: any) {
        try {
            let studentId = params?.studentId
            let {
                name,
                dob,
                gender,
                email,
                phoneNumber,
                address,
                description,
                updatedBy,
            } = body

            let studentExist = await Student.findOne({ where: { studentId: studentId } })
            if (!studentExist) {
                throw new Exception(
                    'NOT_FOUND',
                    `Student with id ${studentId} does not exist.`
                )
            }

            let studentUpdateBody = {
                name: name ?? studentExist?.dataValues?.name,
                dob: dob || studentExist?.dataValues?.dob,
                gender: gender || studentExist?.dataValues?.gender,
                email: email || studentExist?.dataValues?.email,
                phoneNumber: phoneNumber || studentExist?.dataValues?.phoneNumber,
                address: address || studentExist?.dataValues?.address,
                description: description || studentExist?.dataValues?.description,
                updatedBy: updatedBy || studentExist?.dataValues?.updatedBy,
            }

            /**
            * query for updating the student info
            */
            let updateStudent = await Student.update(studentUpdateBody, { where: { studentId: studentId } })
            let result = await Student.findByPk(studentId)
            console.log('student updated successfully')
            return Promise.resolve(result)
        }
        catch (error: any) {
            console.error('error in updating student');
            return Promise.reject(error);
        }
    }

}

export const projectService = new StudentService()

