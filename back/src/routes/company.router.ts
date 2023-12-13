import {Router} from "express";
import {CompanyController} from "../controller/company.controller";
import {TokenServiceImpl} from "../service/token.service.impl";
import {authentificate} from "../utils/guard.js";
import {HttpCodes, HttpConstants} from "../utils/constants/httpConstants";
import {errorHandler} from "../utils/errorHandler";

export class CompanyRouter {
    router  = Router()
    tokenService = new TokenServiceImpl();

    constructor(private companyController: CompanyController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/get', async (req, res) => {
            try {
                console.log("Serving request for /getall")
                const authorizationHeader = req.headers.authorization;
                let isLoged = false;
                let userToken = null;
                if(authorizationHeader) {
                    const [, token] = authorizationHeader.split(' ');
                    userToken = token ?? null;
                    isLoged = await authentificate(userToken, false);
                }

                const companies  = await this.companyController.getAllCompanies(isLoged ? userToken : null);
                if(companies != null) {
                    res.status(HttpCodes.OK).json(companies);
                    return;
                } else {
                    res.status(HttpCodes.NOTFOUND).json({error: 'Companies not found'});
                    return;
                }
            } catch (error) {
                if(error instanceof Error) {
                    if (Object.values(HttpConstants).includes(error.message as HttpConstants)) {
                        res.status(errorHandler(error.message as HttpConstants)).json({error: error.message});
                        return;
                    }

                    res.status(500).send('internal server error');
                }
            }
        });

        this.router.get('/get/:symbol', async (req, res) => {
            try {
                console.log("Serving request for /get/" + req.params.symbol)
                const authorizationHeader = req.headers.authorization;
                let isLoged = false;
                let userToken = null;
                if(authorizationHeader) {
                    const [, token] = authorizationHeader.split(' ');
                    userToken = token ?? null;
                    isLoged = await authentificate(userToken, false);
                }


                const company  = await this.companyController.getCompanyBySymbol(req.params.symbol, isLoged ? userToken : null);
                if(company != null) {
                    res.status(200).send(company);
                    return;
                } else {
                    res.status(400).send('Company not found');
                    return;
                }
            } catch (error) {
                if(error instanceof Error) {
                    if (Object.values(HttpConstants).includes(error.message as HttpConstants)) {
                        res.status(errorHandler(error.message as HttpConstants)).json({error: error.message});
                        return;
                    }

                    res.status(500).send('internal server error');
                }
            }
        });
    }
}