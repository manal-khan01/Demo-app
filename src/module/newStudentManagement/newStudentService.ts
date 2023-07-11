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
    try {
      console.log("inside service function");
      const connection = await createConnection();
      const userRepository = connection.getRepository(StudentEntity);

      let listOfUsers = await userRepository.find();
      await connection.close();
      return Promise.resolve(listOfUsers)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async createNewStudent(body: any) {
    try {
      console.log("inside the create new student service function")
      const connection = await createConnection();
      const userRepository = connection.getRepository(StudentEntity);
      const newUser = userRepository.create(body);
      let result = await userRepository.save(newUser);
      await connection.close();

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
      console.log("inside the update student service function")
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
      const connection = await createConnection();
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
      return Promise.reject(error)
    }
  }

  async getStudentById(id: string) {
    try {
      let studentId = id;

      const connections = await createConnection();
      const userRepository = connections.getRepository(StudentEntity);
      let user = await userRepository.findOne({
        where: {
          studentId: studentId,
        },
      });

      await connections.close();
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
      const connections = await createConnection();
      const userRepository = connections.getRepository(StudentEntity);

      let userDelete = await userRepository.delete(studentId)
      await connections.close();
      console.log("student deleted successfully");
      return Promise.resolve("student deleted successfully");
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }

  }
}