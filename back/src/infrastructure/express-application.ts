import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';

import * as dotenv from 'dotenv';
import {CompanyService} from "../service/company.service";
import {CompanyServiceImpl} from "../service/company.service.impl";
import {UserService} from "../service/user.service";
import {UserServiceImpl} from "../service/user.service.impl";

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private companyService!: CompanyService;
    private userService!: UserService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServices(): void {
        this.companyService = new CompanyServiceImpl();
        this.userService = new UserServiceImpl();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(this.companyService, this.userService);
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }
}