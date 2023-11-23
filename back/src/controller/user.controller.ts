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

    deleteUser(id: number) {
        return this.UserService.deleteUser(id);
    }

    async getUserByUsername(username: string) {
        return await this.UserService.getUserByUsername(username);
    }
}