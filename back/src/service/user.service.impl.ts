import {UserService} from "./user.service";
import {User} from "../model/user.model";
import {UserRepository} from "../db/Repository/user.repository";
import bcrypt from "bcrypt";


export class UserServiceImpl implements UserService {

        async getAllUsers(): Promise<User[]> {
            return [];
        }

        async addUser(user: User): Promise<User> {
            if(user.username === undefined || user.password === undefined) {
                throw new Error("Username or password is undefined");
            }
            return await User.create({
                username: user.username,
                password: await bcrypt.hash(user.password, 10)
            });
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

        async checkPassword(password: string, dbPass: string): Promise<boolean> {
            return await bcrypt.compare(password, dbPass);
        }
}