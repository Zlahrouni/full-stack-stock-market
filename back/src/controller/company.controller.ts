import {CompanyService} from "../service/company.service";
import {HttpConstants} from "../utils/constants/httpConstants";
import {UserServiceImpl} from "../service/user.service.impl";
import {CompanyServiceImpl} from "../service/company.service.impl";
import {TokenServiceImpl} from "../service/token.service.impl";

export class CompanyController {
    userService = new UserServiceImpl();
    companyService = new CompanyServiceImpl();
    tokenService = new TokenServiceImpl();
    constructor(private CompanyService: CompanyService) {}

   async getAllCompanies( token: string | null = null) {
        let username = null;
        if(token != null) {
            username = await this.tokenService.getUserName(token);
            if(username != null) {
                this.userService.checkIfUserExists(username).then(r => {
                    if(!r) {
                        throw new Error(HttpConstants.USERNAMENOTFOUND);
                    }
                });
            }
        }
        if(username == null) {
            return await this.CompanyService.getAllCompanies();
        } else {
            return await this.CompanyService.getAllCompanies(username);
        }
    }

    async getCompanyBySymbol(symbol: string, token: string | null = null) {
        if(symbol == null) {
            throw new Error(HttpConstants.PARAMREQUIRED);
        }

        let username = null;
        if(token != null) {
            username = await this.tokenService.getUserName(token);
            if(username != null) {
                this.userService.checkIfUserExists(username).then(r => {
                    if(!r) {
                        throw new Error(HttpConstants.USERNAMENOTFOUND);
                    }
                });
            }
        }
        if(username == null) {
            return await this.CompanyService.getCompanyBySymbol(symbol);
        } else {
            return await this.CompanyService.getCompanyBySymbol(symbol, username);
        }

    }
}