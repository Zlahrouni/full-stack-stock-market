import {User} from "@/models/user";
import {ApiResponse} from "@/models/types/ApiReponse";
import {deleteCookie, getCookie, setCookie} from "@/utils/coockies.utils";
import store from "@/store";


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

export async function loginUser(user: User): Promise<ApiResponse<string>> {
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

            return new ApiResponse<string>(true, token);
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error; // Adjust the property based on your API response
            console.log("Error message:", errorMessage);
            return new ApiResponse<string>(false, undefined, errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        return new ApiResponse<string>(false, undefined, 'An unexpected error occurred.');
    }
}

export async function checkToken(token: String) {
    try {
        const response = await fetch(`http://localhost:3000/api/user/checkToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token}),
        });
        console.log("response"+  response);
        if (response.ok) {
            const userData = await response.json();
            return new ApiResponse<String>(response.ok, userData.username);
        } else {
            const errorMessage = await response.json();
            console.log("userdata "+  errorMessage);
            return new ApiResponse<String>(response.ok, undefined, errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        return new ApiResponse<String>(false, undefined, 'An unexpected error occurred.');
    }
}

export async function logoutUser() {
    console.log("logout started")
    try {
        let token = getCookie("token");
        if(typeof token !== 'undefined') {
            const response = await fetch(`http://localhost:3000/api/user/logout`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("response" + response);
            if (response.ok) {
                console.log("logout successful")
                await store.dispatch('clear');
                return true;
            } else {
                console.log("logout failed")
                deleteCookie("token");
                return false;
            }
        } else {
            console.log("No token found - clearing store")
            await store.dispatch('clear');
            return true;
        }

    } catch (error) {
        console.error('Error:', error);
        return true;
    }
}

export async function deleteUser() {
    console.log("delete started")
    try {
        let token = getCookie("token");
        if(typeof token !== 'undefined') {
            const response = await fetch(`http://localhost:3000/api/user/delete`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("response" + response);
            if (response.ok) {
                console.log("delete successful")
                await store.dispatch('clear');
                return true;
            } else {
                console.log("delete failed")
                deleteCookie("token");
                return false;
            }
        } else {
            console.log("No token found - clearing store")
            await store.dispatch('clear');
            return true;
        }

    } catch (error) {
        console.error('Error:', error);
        return true;
    }
}
