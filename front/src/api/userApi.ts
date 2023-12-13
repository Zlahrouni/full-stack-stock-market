import {User} from "@/models/user";
import {ApiResponse} from "@/models/types/ApiReponse";
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
        if (response.ok) {
            const userData = await response.json();
            return new ApiResponse<User>(response.ok, userData);
        } else {
            const errorMessage = await response.text();
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
            //setCookie("token", token);

            return new ApiResponse<string>(true, token);
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error; // Adjust the property based on your API response
            return new ApiResponse<string>(false, undefined, errorMessage);
        }
    } catch (error) {
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
        if (response.ok) {
            const userData = await response.json();
            return new ApiResponse<String>(response.ok, userData.username);
        } else {
            const errorMessage = await response.json();
            return new ApiResponse<String>(response.ok, undefined, errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        return new ApiResponse<String>(false, undefined, 'An unexpected error occurred.');
    }
}

export async function logoutUser() {
    try {
        let token = store.getters.getToken;
        if(typeof token !== 'undefined') {
            const response = await fetch(`http://localhost:3000/api/user/logout`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                await store.dispatch('clear');
                return true;
            } else {
                return false;
            }
        } else {
            await store.dispatch('clear');
            return true;
        }

    } catch (error) {
        console.error('Error:', error);
        return true;
    }
}

export async function deleteUser() {
    try {
        let token = store.getters.getToken;
        let username = store.getters.getUsername;
        if(typeof token !== 'undefined') {
            const response = await fetch(`http://localhost:3000/api/user/delete`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username}),
            });
            if (response.ok) {
                await store.dispatch('clear');
                return true;
            } else {
                return false;
            }
        } else {
            await store.dispatch('clear');
            return true;
        }

    } catch (error) {
        console.error('Error:', error);
        return true;
    }
}

