import { Request, Response } from "express";
import { projectService } from './studentService'

class StudentController {
    service: any;
    constructor() {
        this.create = this.create.bind(this);
        this.readOne = this.readOne.bind(this);
        this.readAll = this.readAll.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async readOne(request: Request, response: Response) {
        try {
            const { params, query } = request;
            let data = await projectService.readOne(params, query);
            return response.status(200).send(data)
        } catch (err: any) {
            console.error(err)
            return response.status(400).send(err)
        }
    }

    async readAll(request: Request, response: Response) {
        try {
            const { params, query } = request;
            let data = await projectService.readAll(params, query);
            return response.status(200).send(data)
        } catch (err: unknown) {
            console.error(err);
            return response.status(400).send(err)
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { params, query, body } = request;
            let data = await projectService.create(params, query, body);
            return response.status(201).send(data)
        } catch (err: any) {
            console.error(err)
            return response.status(400).send(err);
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { params, query, body } = request;
            let data = await projectService.update(params, query, body);
            return response.status(200).send(data)
        } catch (err: unknown) {
            console.error(err);
            return response.status(400).send(err);
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const { params, query, body } = request;
            let data = await projectService.delete(params, query);
            return response.status(200).send(data)
        } catch (err: any) {
            console.error(err);
            return response.status(400).send(err)
        }
    }
}

export default StudentController;

