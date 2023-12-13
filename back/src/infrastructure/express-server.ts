import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import { ExpressRouter } from "./express-router";
import path from "path";

export class ExpressServer {
    private express: Express = express();

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureExpress();
        this.configureRoutes();
    }

    private configureExpress(): void {
        // Add request logging middleware
        this.express.use(this.requestLoggerMiddleware);

        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use('/assets', express.static(path.join(__dirname, '../assets')));
    }

    private requestLoggerMiddleware(req: Request, res: Response, next: NextFunction): void {
        // Extracting information from the request
        const userAgent = req.get('user-agent') || 'Unknown';
        const clientIP = req.ip;

        // Extracting browser name (you may want to use a library for more accurate parsing)
        const browserName = getBrowserName(userAgent);

        // Logging request information
        console.log(`User Agent: ${userAgent}`);
        console.log(`Client IP: ${clientIP}`);
        console.log(`Browser Name: ${browserName}`);

        // Continue processing the request
        next();
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

function getBrowserName(userAgent: string): string {
    if (userAgent.includes('Chrome')) {
        return 'Chrome';
    } else if (userAgent.includes('Firefox')) {
        return 'Firefox';
    } else {
        return 'Unknown Browser';
    }
}
