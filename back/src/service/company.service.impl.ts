import {CompanyService} from "./company.service";

import {CompanyDTO} from "../model/DTO/companyDTO";
import {getStockQuote} from "./extern/finnhub";
import {Company} from "../model/company.model";
import {Favorite} from "../model/favorite.model";

export class CompanyServiceImpl implements CompanyService {


    async getAllCompanies(username: string | null = null): Promise<CompanyDTO[]> {
        const companies: Company[] = await Company.findAll(); // Read your companies from JSON
        const companiesDTO: CompanyDTO[] = [];
        console.log("companies :");
        console.log(companies);
        for (const company of companies) {
            try {
                // Fetch the stock quote for the company's symbol
                const stockQuote = await getStockQuote(company.symbol);

                const companyDTO = {} as CompanyDTO;
                companyDTO.symbol = company.symbol;
                companyDTO.name = company.name;
                companyDTO.stockQuote = stockQuote;
                companyDTO.website = company.website;

                if(username != null) {
                    await Favorite.findOne({
                        where: {
                            username: username,
                            symbol: company.symbol
                        }
                    }).then((favorite) => {
                        companyDTO.favorite = favorite != null;
                    });
                }

                companiesDTO.push(companyDTO);
            } catch (error) {
                // Handle any errors, e.g., log the error
                console.error(`Error fetching stock quote for ${company.symbol}: ${error}`);
            }
        }

        // Wait for all stock quote Promises to resolve
        await Promise.all(companiesDTO);

        // Now, the companiesDTO array contains the stock quotes
        return companiesDTO;
    }
    async getCompanyBySymbol(symbol: string, username: string | null = null): Promise<CompanyDTO | null>  {
        const company: Company | null = await Company.findBySymbol(symbol);

        const companyDTO: CompanyDTO = {} as CompanyDTO;
        if (company != null) {

            const stockQuote = await getStockQuote(company.symbol);

            companyDTO.symbol = company.symbol;
            companyDTO.name = company.name;
            companyDTO.stockQuote = stockQuote;
            companyDTO.website = company.website;

            if(username != null) {
                await Favorite.findOne({
                    where: {
                        username: username,
                        symbol: company.symbol
                    }
                }).then((favorite) => {
                    companyDTO.favorite = favorite != null;
                });
            }
            return companyDTO;
        }
        return null;
    }

    async checkIfCompanyExists(symbol: string): Promise<boolean> {
        const company = await Company.findOne({
            where: {
                symbol: symbol
            }
        });
        console.log("company :" + company);
        return company != null;
    }

}