import {Router} from "express";
import {CompanyController} from "../controller/company.controller";

export class CompanyRouter {
    router  = Router()

    constructor(private companyController: CompanyController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/getall', async (req, res) => {
            try {
                const companies = await this.companyController.getAllCompanies();
                res.send(companies);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}