import {User} from "../model/user.model";

export interface UserService {
    addUser(user: User): Promise<User>;
    deleteUser(username: string): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
    checkPassword(password: string, dbPass: string): Promise<boolean>;
    checkIfUserExists(username: string): Promise<boolean>;
}