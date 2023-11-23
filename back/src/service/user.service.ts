import {UserModel} from "../model/user.model";

export interface UserService {
    getAllUsers(): Promise<UserModel[]>;
    addUser(user: UserModel): Promise<UserModel>;
    updateUser(user: UserModel): Promise<UserModel>;
    deleteUser(id: number): Promise<void>;
    getUserByUsername(username: string): Promise<UserModel | null>;
}