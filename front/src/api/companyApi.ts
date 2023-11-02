import axios from "axios";
import type {CompanyDTO} from "@/models/companyDTO";

export async function getAllCompanies(): Promise<CompanyDTO[]> {
    try {
        console.log('Before await');
        const response = await axios.get(`http://localhost:3000/api/company/getall`);
        console.log('After await');
        console.log(response.data);
        return response.data;
        // Process the stock quote data here
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}