import {User} from "@/models/user";
import {ApiResponse} from "@/models/types/ApiReponse";


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