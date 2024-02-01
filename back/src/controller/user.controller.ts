import {UserService} from "../service/user.service";
import {HttpConstants} from "../utils/constants/httpConstants";
import * as jwt from "jsonwebtoken";
import {TokenServiceImpl} from "../service/token.service.impl";

export class UserController {
    tokenService = new TokenServiceImpl();
    constructor(private userService: UserService) {
    }

    async addUser(username: string, password: string) {
        if(username == null || username.length === 0 || password == null || password.length === 0) {
            throw new Error(HttpConstants.PARAMREQUIRED);
        }
        // Check if username already exists
        const userExist = await this.userService.checkIfUserExists(username);
        if(userExist)  {
            console.log("Username already exists")
            throw new Error(HttpConstants.USERNAMEALREADYEXISTS);
        }
        await this.userService.addUser(username, password);
    }

    async login(username: string, password: string) {
        if(username == null || username.length === 0 || password == null || password.length === 0) {
            throw new Error(HttpConstants.PARAMREQUIRED);
        }

        const isLogged =  await this.userService.login(username, password);

        if(!isLogged) {
            throw new Error(HttpConstants.INVALIDUSERNAMEORPASSWORD);
        } else {
            const secretKey = 'your-secret-key';
            const uniqueIdentifier = Date.now();

            const tokenPayload = {
                username: username,
                uniqueIdentifier: uniqueIdentifier,
            };
            const token = jwt.sign(tokenPayload, secretKey);
            await this.tokenService.setToken(token, username);
            return token;
        }


    }

    async deleteUser(username: string) {
        if(username == null || username.length === 0) {
            throw new Error(HttpConstants.PARAMREQUIRED);
        }

        const userExists = await this.userService.checkIfUserExists(username);
        if(!userExists) {
            throw new Error(HttpConstants.USERNAMENOTFOUND);
        }

        return this.userService.deleteUser(username);
    }


}