import {Company} from "../model/company";
import {CompanyDTO} from "../model/companyDTO";

export interface CompanyService {
    getAllCompanies(): Promise<CompanyDTO[]>;
    getCompanyBySymbol(symbol: string): Company | null;

}