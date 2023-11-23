import {UserService} from "./user.service";
import {User} from "../model/user.model";
import {UserRepository} from "../db/Repository/user.repository";


export class UserServiceImpl implements UserService {

        async getAllUsers(): Promise<User[]> {
            return [];
        }

        async addUser(user: User): Promise<User> {
            if(user.username === undefined || user.password === undefined) {
                throw new Error("Username or password is undefined");
            }
            return await UserRepository.addUser(user);
        }

        async updateUser(user: User): Promise<User> {
            return user;
        }

        async deleteUser(id: number): Promise<void> {
            return;
        }

        async getUserByUsername(username: string): Promise<User | null> {
            return UserRepository.getUserByUsername(username);
        }
}