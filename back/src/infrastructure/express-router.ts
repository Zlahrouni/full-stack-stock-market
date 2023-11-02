import { Router } from 'express';
import {CompanyController} from "../controller/company.controller";
import {CompanyRouter} from "../routes/company.router";
import {CompanyService} from "../service/company.service";


export class ExpressRouter {
    router = Router();

    private companyController!: CompanyController;
    private companyRouter!: CompanyRouter;

    constructor(private companyService: CompanyService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.companyController = new CompanyController(this.companyService);
    }

    private configureRouters(): void {
        this.companyRouter = new CompanyRouter(this.companyController);
    }

    private configureRoutes(): void {
        this.router.use('/company', this.companyRouter.router);
    }
}