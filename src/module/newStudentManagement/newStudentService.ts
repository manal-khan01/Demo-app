import { Service } from 'typedi';
import { StudentEntity } from './studentEntity';
import Exception from '../studentManagement/utils/exception';
import { AppDataSource } from "../../database/mysql/connection"




@Service()
export class StudentService {
  constructor() {
  }

  async getAllStudents() {
    try {
      const studentRepository = AppDataSource.getRepository(StudentEntity);

      let listOfUsers = await studentRepository.find();
      console.log("successfully fetched list of all students");
      return Promise.resolve(listOfUsers)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async createNewStudent(body: any) {
    try {
      const studentRepository = AppDataSource.getRepository(StudentEntity);
      let result = await studentRepository.save(body);
      console.log("student created successfully")
      return Promise.resolve(result)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async updateStudent(id: string, body: any) {
    try {
      let studentId = id
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

      const studentRepository = AppDataSource.getRepository(StudentEntity);

      let studentExist = await studentRepository.findOne({
        where: {
          studentId: studentId,
        },
      });

      if (!studentExist) {
        throw new Exception(
          'NOT_FOUND',
          `Student with id ${studentId} does not exist.`
        )
      }

      let studentUpdateBody = {
        name: name || studentExist?.name,
        dob: dob || studentExist?.dob,
        gender: gender || studentExist?.gender,
        email: email || studentExist?.email,
        phoneNumber: phoneNumber || studentExist?.phoneNumber,
        address: address || studentExist?.address,
        description: description || studentExist?.description,
        updatedBy: updatedBy || studentExist?.updatedBy,
      }

      await studentRepository.update(studentId, studentUpdateBody);
      let updatedStudent = await studentRepository.findOne({
        where: {
          studentId: studentId,
        },
      });

      console.log("student updated successfully");
      return Promise.resolve(updatedStudent)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async getStudentById(id: string) {
    try {
      let studentId = id;

      const studentRepository = AppDataSource.getRepository(StudentEntity);
      let user = await studentRepository.findOne({
        where: {
          studentId: studentId,
        },
      });

      console.log("successfully fetched studen by studentId")
      return Promise.resolve(user)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async deleteStudent(id: string) {
    try {
      let studentId = id
      const studentRepository = AppDataSource.getRepository(StudentEntity);

      let userDelete = await studentRepository.delete(studentId)
      console.log("student deleted successfully");
      return Promise.resolve("student deleted successfully");
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }

  }
}