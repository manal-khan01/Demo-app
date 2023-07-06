import express from 'express';
import dotenv from 'dotenv';
import expressServer from "./server";
import { initMySQLConnection } from './database/mysql/connection';


dotenv.config();

let expressInstance = new expressServer().expressInstance;


const app = express();
const port = process.env.PORT || 8000;

app.use(expressInstance);


app.listen(port, () => {
   console.log(`Express is listening at http://localhost:${port}`);
   initMySQLConnection()
});
