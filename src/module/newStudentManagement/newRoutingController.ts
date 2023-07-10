import { JsonController, Get, Post, Body, HttpCode, Patch, Param, Delete } from 'routing-controllers';
import { Service, Inject } from 'typedi';
import { StudentService } from './newStudentService'
import { body } from 'express-validator';


@JsonController('/newstudents')
@Service() // Decorate with Service from TypeDI
export class StudentController {
  studentService: any
  constructor(@Inject() studentService: StudentService) {
    this.studentService = studentService;
  }

  @Get('/')
  async getAllStudents() {
    try {
      console.log("here in controller");
      await this.studentService.getAllStudents()
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }

  }

  @HttpCode(201)
  @Post('/')
  async createNewStudent(@Body() body: any) {
    try {
      console.log("new student body>>")
      await this.studentService.createNewStudent(body)
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  @Patch('/:id')
  async updateStudent(@Param('id') id: string, @Body() body: any) {
    try {
      console.log("update student body>>")
      await this.studentService.updateStudent(id, body)
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  @Get('/:id')
  async getStudentById(@Param('id') id: string) {
    try {
      console.log("get student by id body>>")
      await this.studentService.getStudentById(id)
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  @Delete('/:id')
  async deleteStudent(@Param('id') id: string) {
    try {
      console.log("delete student by id body>>")
      await this.studentService.deleteStudent(id)
      return Promise.resolve(true)
    }
    catch (error: any) {
      console.error(error)
      return Promise.reject(error)
    }
  }

}