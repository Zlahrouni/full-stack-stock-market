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
                res.status(200).send(companies);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });

        this.router.get('/get/:symbol', async (req, res) => {
            try {
                console.log("Serving request for /get/" + req.params.symbol)
                const company  = await this.companyController.getCompanyBySymbol(req.params.symbol);
                res.status(200).send(company);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}