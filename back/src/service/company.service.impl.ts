import {CompanyService} from "./company.service";

import {CompanyDTO} from "../model/DTO/companyDTO";
import {getStockQuote} from "./extern/finnhub";
import {CompaniesRepository} from "../db/Repository/companies.repository";
import {Company} from "../model/company.model";
import {where} from "sequelize";

export class CompanyServiceImpl implements CompanyService {


    async getAllCompanies(): Promise<CompanyDTO[]> {
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
    async getCompanyBySymbol(symbol: string): Promise<CompanyDTO | null>  {
        const company: Company | null = await Company.findBySymbol(symbol);

        const companyDTO: CompanyDTO = {} as CompanyDTO;
        if (company != null) {

            const stockQuote = await getStockQuote(company.symbol);

            companyDTO.symbol = company.symbol;
            companyDTO.name = company.name;
            companyDTO.stockQuote = stockQuote;
            companyDTO.website = company.website;

            return companyDTO;
        }
        return null;
    }

}