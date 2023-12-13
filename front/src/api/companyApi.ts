import type {CompanyDTO} from "@/models/companyDTO";
import {ApiResponse} from "@/models/types/ApiReponse";
import store from "@/store";

export async function getAllCompanies(): Promise<ApiResponse<CompanyDTO[]>> {
    try {
        let token = store.getters.getToken;
        const response = await fetch('http://localhost:3000/api/company/get', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if(response.ok) {
            const data = await response.json();
            console.log("13122023 - data : "+  data);
            return new ApiResponse<CompanyDTO[]>(true, data);
        }
        else {
            const data = await response.json();
            return new ApiResponse<CompanyDTO[]>(false, undefined, data.error);
        }
        // Process the stock quote data here
    } catch (error) {
        return new ApiResponse<CompanyDTO[]>(false, undefined, 'Unexpected error');
    }
}

export async function getCompanyBySymbol(symbol: string): Promise<ApiResponse<CompanyDTO>> {
    try {

        let token = store.getters.getToken;
        const response = await fetch(`http://localhost:3000/api/company/get/${symbol}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            const data = await response.json();
            return new ApiResponse<CompanyDTO>(true, data, 'Company found');
        } else {
            const data = await response.json();
            return new ApiResponse<CompanyDTO>(false, undefined, data.error);
        }

        // Process the stock quote data here
    } catch (error) {
        console.error('Error:', error);

        return new ApiResponse<CompanyDTO>(false, undefined, 'An unexpected error occurred.');
    }
}