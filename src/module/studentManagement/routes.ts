import { Router } from "express";
import StudentController from '../studentManagement/studentController'
import { studentsValidator } from './studentValidator'


class StudentRoutes {
    router: Router;
    student: StudentController;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.student = new StudentController()
        this.studentRoutes();

    }

    private studentRoutes() {
        this.router.route('/api/v1/student/:studentId').get(this.student.readOne)
        this.router.route('/api/v1/students').get(this.student.readAll)
        this.router.route('/api/v1/student').post(studentsValidator.makeValidation('create'),this.student.create)
        this.router.route('/api/v1/student/:studentId').delete(this.student.delete)
        this.router.route('/api/v1/student/:studentId').patch(studentsValidator.makeValidation('update'),this.student.update)

    }

}


export default new StudentRoutes().router;
