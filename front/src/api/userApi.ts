import {User} from "@/models/user";
import {ApiResponse} from "@/models/types/ApiReponse";
import {setCookie} from "@/utils/coockies.utils";


export async function addUser(user: User): Promise<ApiResponse<User>> {
    try {
        const response = await fetch(`http://localhost:3000/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        console.log("response"+  response);
        if (response.ok) {
            const userData = await response.json();
            return new ApiResponse<User>(response.ok, userData);
        } else {
            const errorMessage = await response.text();
            console.log("userdata "+  errorMessage);
            return new ApiResponse<User>(response.ok, undefined, errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        return new ApiResponse<User>(false, undefined, 'An unexpected error occurred.');
    }
}

export async function loginUser(user: User): Promise<ApiResponse<User>> {
    try {
        const response = await fetch(`http://localhost:3000/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const responseData = await response.json();
            const token = responseData.token;

            // Handle the token here and store it securely
            // Example: storeToken(token);
          //  console.log("token"+  token);
            setCookie("token", token);
            return new ApiResponse<User>(true, responseData);
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error; // Adjust the property based on your API response
            console.log("Error message:", errorMessage);
            return new ApiResponse<User>(false, undefined, errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        return new ApiResponse<User>(false, undefined, 'An unexpected error occurred.');
    }
}

export async function checkCoockie(token: String): Promise<ApiResponse<User>> {
    try {
    const response = await fetch(`http://localhost:3000/api/user/checkCoockie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(token),
            });

        if (response.ok) {
            const responseData = await response.json();
            return new ApiResponse<User>(true, responseData.username);
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error; // Adjust the property based on your API response
            console.log("Error message:", errorMessage);
            return new ApiResponse<User>(false, undefined, errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        return new ApiResponse<User>(false, undefined, 'An unexpected error occurred.');
    }
}
