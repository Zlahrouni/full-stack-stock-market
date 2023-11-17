import {CompanyDTO} from "../model/companyDTO";

export interface CompanyService {
    getAllCompanies(): Promise<CompanyDTO[]>;
    getCompanyBySymbol(symbol: string): Promise<CompanyDTO | null> ;

}