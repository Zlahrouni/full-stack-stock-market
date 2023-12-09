import {CompanyDTO} from "../model/DTO/companyDTO";

export interface CompanyService {
    getAllCompanies(): Promise<CompanyDTO[]>;
    getCompanyBySymbol(symbol: string): Promise<CompanyDTO | null> ;

}