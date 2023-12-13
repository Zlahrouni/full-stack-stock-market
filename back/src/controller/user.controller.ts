import { User } from "../model/user.model";
import {UserService} from "../service/user.service";
import {HttpConstants} from "../utils/constants/httpConstants";
import {UserServiceImpl} from "../service/user.service.impl";

export class UserController {
    userService = new UserServiceImpl();

    constructor(private UserService: UserService) {
    }

    addUser(user: User) {
        return this.UserService.addUser(user);
    }


    async deleteUser(username: string) {
        if(username == null || username.length === 0) {
            throw new Error(HttpConstants.PARAMREQUIRED);
        }

        const userExists = await this.userService.checkIfUserExists(username);
        if(!userExists) {
            throw new Error(HttpConstants.USERNAMENOTFOUND);
        }

        return this.UserService.deleteUser(username);
    }

    async getUserByUsername(username: string) {
        return await this.UserService.getUserByUsername(username);
    }

    async checkPassword(password: string, dbPass: string) {
        return await this.UserService.checkPassword(password, dbPass);
    }

}