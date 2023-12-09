import {User} from "../model/user.model";

export interface UserService {
    getAllUsers(): Promise<User[]>;
    addUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(username: string): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
    checkPassword(password: string, dbPass: string): Promise<boolean>;
}