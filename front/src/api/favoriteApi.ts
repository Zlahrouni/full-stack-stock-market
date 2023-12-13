import store from "@/store";
import {ApiResponse} from "@/models/types/ApiReponse";
import {CompanyDTO} from "@/models/companyDTO";

export async function addOrRemoveFavorite(symbol: String, isFavorite: boolean) {
    if(!isFavorite) {
        let token = store.getters.getToken;
        let username = store.getters.getUsername;
        const response = await fetch(`http://localhost:3000/api/favorite/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username, symbol: symbol}),
        });

        if(response.ok) {
            const data = await response.json();
            return new ApiResponse<boolean>(true, true, data.message);
        } else {
            const errorMessage = await response.json();
            return new ApiResponse<boolean>(false, undefined, errorMessage.error);
        }
    } else {
        let token = store.getters.getToken;
        let username = store.getters.getUsername;
        const response = await fetch(`http://localhost:3000/api/favorite/remove`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username, symbol: symbol}),
        });

        if(response.ok) {
            const data = await response.json();
            return new ApiResponse<boolean>(true, true, data.message);
        } else {
            const errorMessage = await response.json();
            return new ApiResponse<boolean>(false, undefined, errorMessage.error);
        }
    }
}

export async function getFavorites() {
    let token = store.getters.getToken;
    let username = store.getters.getUsername;
    const response = await fetch(`http://localhost:3000/api/favorite/get`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username}),
    });

    if(response.ok) {
        const data = await response.json();
        console.log("data.favorites :"+data.favorites);
        return new ApiResponse<CompanyDTO[]>(true, data.favorites, undefined);
    } else {
        const errorMessage = await response.json();
        return new ApiResponse<CompanyDTO[]>(false, undefined, errorMessage.error);
    }
}