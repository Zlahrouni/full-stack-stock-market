import express, { Express } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import {ExpressRouter} from "./express-router";


export class ExpressServer {
    private express : Express = express();

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureBodyParser();
        this.configureRoutes();
    }

    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
        this.express.use(cors());
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }
}