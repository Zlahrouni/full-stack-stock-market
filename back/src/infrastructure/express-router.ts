import { Router } from 'express';
import {CompanyController} from "../controller/company.controller";
import {CompanyRouter} from "../routes/company.router";
import {CompanyService} from "../service/company.service";
import {UserController} from "../controller/user.controller";
import {UserRouter} from "../routes/user.router";
import {UserService} from "../service/user.service";
import {FavoriteController} from "../controller/favorite.controller";
import {FavoriteRouter} from "../routes/favorite.router";
import {FavoriteService} from "../service/favorite.service";


export class ExpressRouter {
    router = Router();

    private companyController!: CompanyController;
    private companyRouter!: CompanyRouter;

    private userController!: UserController;
    private userRouter!: UserRouter;

    private favoriteController!: FavoriteController;
    private favoriteRouter!: FavoriteRouter;

    constructor(private companyService: CompanyService, private userService: UserService, private favoriteSerivce: FavoriteService ) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.companyController = new CompanyController(this.companyService);
        this.userController = new UserController(this.userService);
        this.favoriteController = new FavoriteController(this.favoriteSerivce);
    }

    private configureRouters(): void {
        this.companyRouter = new CompanyRouter(this.companyController);
        this.userRouter = new UserRouter(this.userController);
        this.favoriteRouter = new FavoriteRouter(this.favoriteController);
    }

    private configureRoutes(): void {
        this.router.use('/company', this.companyRouter.router);
        this.router.use('/user', this.userRouter.router);
        this.router.use('/favorite', this.favoriteRouter.router);
    }
}