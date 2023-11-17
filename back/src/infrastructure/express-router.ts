import { Router } from 'express';
import {CompanyController} from "../controller/company.controller";
import {CompanyRouter} from "../routes/company.router";
import {CompanyService} from "../service/company.service";
import {UserController} from "../controller/user.controller";
import {UserRouter} from "../routes/user.router";
import {UserService} from "../service/user.service";


export class ExpressRouter {
    router = Router();

    private companyController!: CompanyController;
    private companyRouter!: CompanyRouter;

    private userController!: UserController;
    private userRouter!: UserRouter;

    constructor(private companyService: CompanyService, private userService: UserService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.companyController = new CompanyController(this.companyService);
        this.userController = new UserController(this.userService);
    }

    private configureRouters(): void {
        this.companyRouter = new CompanyRouter(this.companyController);
        this.userRouter = new UserRouter(this.userController);
    }

    private configureRoutes(): void {
        this.router.use('/company', this.companyRouter.router);
        this.router.use('/user', this.userRouter.router);
    }
}