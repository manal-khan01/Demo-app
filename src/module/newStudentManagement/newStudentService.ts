import { Service } from 'typedi';

import { createConnection } from 'typeorm';
import { StudentEntity } from './studentEntity';





@Service()
export class StudentService {
  constructor() { }

  async getAllStudents() {
    try {
      console.log("inside service function");
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async createNewStudent(body: any) {
    try {
      console.log("inside the create new student service function", body)
      const connection = await createConnection();
      const userRepository = connection.getRepository(StudentEntity);
      const newUser = userRepository.create(body);
      await userRepository.save(newUser);

      const users = await userRepository.find();
      console.log(users);
      await connection.close();

      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async updateStudent(id: string, body: any) {
    try {
      console.log("inside the update student service function", id, body)
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async getStudentById(id: string) {
    try {
      console.log("inside the get student by id service function", id)
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async deleteStudent(id: string) {
    try {
      console.log("inside the delete student service function", id)
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }
}