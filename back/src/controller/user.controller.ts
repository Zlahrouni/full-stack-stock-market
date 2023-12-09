import { User } from "../model/user.model";
import {UserService} from "../service/user.service";

export class UserController {
    constructor(private UserService: UserService) {
    }

    getAllUsers() {
        return this.UserService.getAllUsers();
    }

    addUser(user: User) {
        return this.UserService.addUser(user);
    }

    updateUser(user : User) {
        return this.UserService.updateUser(user);
    }

    deleteUser(username: string) {
        return this.UserService.deleteUser(username);
    }

    async getUserByUsername(username: string) {
        return await this.UserService.getUserByUsername(username);
    }

    async checkPassword(password: string, dbPass: string) {
        return await this.UserService.checkPassword(password, dbPass);
    }

}