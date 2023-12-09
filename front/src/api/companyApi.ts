import axios from "axios";
import type {CompanyDTO} from "@/models/companyDTO";
import {ApiResponse} from "@/models/types/ApiReponse";
import {User} from "@/models/user";

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

export async function getCompanyBySymbol(symbol: string): Promise<ApiResponse<CompanyDTO>> {
    try {

        const response = await axios.get(`http://localhost:3000/api/company/get/${symbol}`);

        console.log("response getCompanyBySymbol : "+  response);
        if(response.status == 200) {
            console.log("response.data"+  response.data)
            return new ApiResponse<CompanyDTO>(true, response.data);
        } else {
            console.log("Error companysymb:"+  response.data);
            return new ApiResponse<CompanyDTO>(false, undefined, response.data);
        }

        // Process the stock quote data here
    } catch (error) {
        console.error('Error:', error);

        return new ApiResponse<CompanyDTO>(false, undefined, 'An unexpected error occurred.');
    }
}