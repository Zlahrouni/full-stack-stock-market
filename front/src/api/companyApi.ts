import axios from "axios";
import type {CompanyDTO} from "@/models/companyDTO";

export async function getAllCompanies(): Promise<CompanyDTO[]> {
    try {

        const response = await axios.get(`http://localhost:3000/api/company/getall`);

        return response.data;
        // Process the stock quote data here
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function getCompanyBySymbol(symbol: string): Promise<CompanyDTO | null> {
    try {

        const response = await axios.get(`http://localhost:3000/api/company/get/${symbol}`);
        console.log("response"+  response.data);
        return response.data;
        // Process the stock quote data here
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}