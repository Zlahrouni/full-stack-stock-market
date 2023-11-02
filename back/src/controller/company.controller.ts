import {CompanyService} from "../service/company.service";

export class CompanyController {
    constructor(private CompanyService: CompanyService) {}

    getAllCompanies() {
        return this.CompanyService.getAllCompanies();
    }
}