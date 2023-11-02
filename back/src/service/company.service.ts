import {Company} from "../model/company";

export interface CompanyService {
    getAllCompanies(): Promise<Company[]>;
    getCompanyBySymbol(symbol: string): Company | null;

}