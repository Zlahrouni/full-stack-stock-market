import {CompanyService} from "./company.service";
import {Company} from "../model/company";
import {DbHandler} from "../db/handler";
import {CompanyDTO} from "../model/companyDTO";
import {getStockQuote} from "./extern/finnhub";

export class CompanyServiceImpl implements CompanyService {


    async getAllCompanies(): Promise<CompanyDTO[]> {
        const companies: Company[] = DbHandler.readJSONFile(); // Read your companies from JSON
        const companiesDTO: CompanyDTO[] = [];

        for (const company of companies) {
            try {
                // Fetch the stock quote for the company's symbol
                const stockQuote = await getStockQuote(company.symbol);

                const companyDTO = {} as CompanyDTO;
                companyDTO.symbol = company.symbol;
                companyDTO.name = company.name;
                companyDTO.stockQuote = stockQuote;

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
    getCompanyBySymbol(symbol: string): Company | null {
        throw new Error("Method not implemented.");
    }

}