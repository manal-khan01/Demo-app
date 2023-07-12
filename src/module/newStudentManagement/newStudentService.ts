import { Service } from 'typedi';
import { Connection, createConnection } from 'typeorm';
import { StudentEntity } from './studentEntity';
import { where } from 'sequelize';
import Exception from '../studentManagement/utils/exception';





@Service()
export class StudentService {
  constructor() {
  }

  async getAllStudents() {
    const connection = await createConnection();
    try {
      const studentRepository = connection.getRepository(StudentEntity);

      let listOfUsers = await studentRepository.find();
      await connection.close();
      console.log("successfully fetched list of all students");
      return Promise.resolve(listOfUsers)
    }
    catch (error: any) {
      console.error(error)
      await connection.close();
      return Promise.reject(error)
    }
  }

  async createNewStudent(body: any) {
    const connection = await createConnection();
    try {
      const studentRepository = connection.getRepository(StudentEntity);
      let newUser = studentRepository.create(body);
      let result = await studentRepository.save(newUser);
      await connection.close();
      console.log("student created successfully")
      return Promise.resolve(result)
    }
    catch (error: any) {
      console.error(error)
      await connection.close();
      return Promise.reject(error)
    }
  }

  async updateStudent(id: string, body: any) {
    const connection = await createConnection();
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

      const studentRepository = connection.getRepository(StudentEntity);

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

      await connection.close();
      console.log("student updated successfully");
      return Promise.resolve(updatedStudent)
    }
    catch (error: any) {
      console.error(error)
      await connection.close();
      return Promise.reject(error)
    }
  }

  async getStudentById(id: string) {
    const connection = await createConnection();
    try {
      let studentId = id;

      const studentRepository = connection.getRepository(StudentEntity);
      let user = await studentRepository.findOne({
        where: {
          studentId: studentId,
        },
      });

      await connection.close();
      console.log("successfully fetched studen by studentId")
      return Promise.resolve(user)
    }
    catch (error: any) {
      console.error(error)
      await connection.close();
      return Promise.reject(error)
    }
  }

  async deleteStudent(id: string) {
    const connection = await createConnection();
    try {
      let studentId = id
      const studentRepository = connection.getRepository(StudentEntity);

      let userDelete = await studentRepository.delete(studentId)
      await connection.close();
      console.log("student deleted successfully");
      return Promise.resolve("student deleted successfully");
    }
    catch (error: any) {
      console.error(error)
      await connection.close();
      return Promise.reject(error)
    }

  }
}