import {User} from "../model/user";

export interface UserService {
    getAllUsers(): Promise<User[]>;
    addUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: number): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
}