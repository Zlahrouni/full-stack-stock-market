import {User} from "../model/user.model";

export interface UserService {
    addUser(username: string, password: string): Promise<User>;
    deleteUser(username: string): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
    login(password: string, dbPass: string): Promise<boolean>;
    checkIfUserExists(username: string): Promise<boolean>;
}