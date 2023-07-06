import express from 'express';
import mainRouter from "./routes";
import bodyParser from "body-parser";



export default class Server {
    expressInstance: express.Express;

    constructor() {
        this.expressInstance = express();
        this.middlewareSetup();
        this.routingSetup();
        
    }
    private middlewareSetup() {
      
        this.expressInstance.use(
          bodyParser.urlencoded({ limit: "50mb", extended: true })
        );
        this.expressInstance.use(bodyParser.json({ limit: "50mb" }));
      }
    private routingSetup() {
       
        // Add to server routes
        this.expressInstance.use("/", mainRouter);
    }
}