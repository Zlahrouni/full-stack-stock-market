import {CompanyDTO} from "../model/DTO/companyDTO";

export interface CompanyService {
    getAllCompanies(username: string | null = null): Promise<CompanyDTO[]>;
    getCompanyBySymbol(symbol: string, username: string | null = null): Promise<CompanyDTO | null> ;
    checkIfCompanyExists(symbol: string): Promise<boolean>;
}