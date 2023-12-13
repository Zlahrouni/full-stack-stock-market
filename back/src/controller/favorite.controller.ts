import {FavoriteService} from "../service/favorite.service";
import {HttpConstants} from "../utils/constants/httpConstants";
import {UserServiceImpl} from "../service/user.service.impl";
import {CompanyServiceImpl} from "../service/company.service.impl";
import {getStockQuote} from "../service/extern/finnhub";
import {CompanyDTO} from "../model/DTO/companyDTO";

export class FavoriteController {
    userService = new UserServiceImpl();
    companyService = new CompanyServiceImpl();
    constructor(private FavoriteService: FavoriteService) {
    }

    async addFavorite(username: string, symbol: string) {
        if(username == null || username.length === 0 || symbol == null || symbol.length === 0) {
            throw new Error(HttpConstants.PARAMREQUIRED);
        }

        const userExists = await this.userService.checkIfUserExists(username);
        if(!userExists) {
            throw new Error(HttpConstants.USERNAMENOTFOUND);
        }

        const companyExists = await this.companyService.checkIfCompanyExists(symbol);
        if(!companyExists) {
            throw new Error(HttpConstants.COMPANYNOTFOUND);
        }

        if(await this.FavoriteService.isFavorite(username, symbol)) {
            throw new Error(HttpConstants.ALREADYEXIST);
        }

        await this.FavoriteService.addFavorite(username, symbol);

    }

    async removeFavorite(username: string, symbol: string) {
        if(username == null || username.length === 0 || symbol == null || symbol.length === 0) {
            throw new Error(HttpConstants.PARAMREQUIRED);
        }

        const userExists = await this.userService.checkIfUserExists(username);
        if(!userExists) {
            throw new Error(HttpConstants.USERNAMENOTFOUND);
        }

        const companyExists = await this.companyService.checkIfCompanyExists(symbol);
        if(!companyExists) {
            throw new Error(HttpConstants.COMPANYNOTFOUND);
        }

        if(!await this.FavoriteService.isFavorite(username, symbol)) {
            throw new Error(HttpConstants.FAVORITENOTFOUND);
        }

        await this.FavoriteService.removeFavorite(username, symbol);
    }

    async getFavorites(username: string) {
        if(username == null || username.length === 0 ) {
            throw new Error(HttpConstants.PARAMREQUIRED);
        }

        const userExists = await this.userService.checkIfUserExists(username);
        if(!userExists) {
            throw new Error(HttpConstants.USERNAMENOTFOUND);
        }

        const symbols = await this.FavoriteService.getFavorites(username);

        const companiesDTO : CompanyDTO[] = [];
        for (const symbol of symbols) {
            await this.companyService.getCompanyBySymbol(symbol).then(async company => {
                if (company != null) {
                    await getStockQuote(company.symbol).then(stockQuote => {
                        const companyDTO = {} as any;
                        companyDTO.symbol = company.symbol;
                        companyDTO.name = company.name;
                        companyDTO.stockQuote = stockQuote;
                        companyDTO.website = company.website;
                        companyDTO.favorite = true;
                        companiesDTO.push(companyDTO);
                    });
                } else {
                    console.log("company not found");
                }
            });
        }
        return companiesDTO;

    }
}