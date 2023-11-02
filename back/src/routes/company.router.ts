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
                console.log("Serving request for /getall")
                const companies  = await this.companyController.getAllCompanies();
                // to test if the arrow function is working
                //companies[0].stockQuote.pc = 60000;
                console.log(companies);

                res.status(200).send(companies);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}