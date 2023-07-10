import express from 'express';
import dotenv from 'dotenv';
import expressServer from "./server";
import { initMySQLConnection } from './database/mysql/connection';

import 'reflect-metadata';
import { Container } from 'typedi';
import { useContainer, useExpressServer } from 'routing-controllers';
import { StudentService } from './module/newStudentManagement/newStudentService';
import { StudentController } from './module/newStudentManagement/newRoutingController';
import { DataSource } from 'typeorm';
// import { connectionOptions } from './module/newStudentManagement/connectionConfig';


// Set up TypeDI container
useContainer(Container);

dotenv.config();

let expressInstance = new expressServer().expressInstance;

// Register the StudentService class in the container
Container.set(StudentService, new StudentService());



const app = express();
const port = process.env.PORT || 8000;

app.use(expressInstance);

// Configure the routing controller with the StudentController
useExpressServer(app, {
   controllers: [StudentController],
});



app.listen(port, () => {
   console.log(`Express is listening at http://localhost:${port}`);
   initMySQLConnection()
});


