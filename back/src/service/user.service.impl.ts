import {UserService} from "./user.service";
import {User} from "../model/user.model";
import bcrypt from "bcrypt";
import {Favorite} from "../model/favorite.model";


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

        async deleteUser(username: string): Promise<void> {
            await User.destroy({
                where: {
                    username: username
                }
            })
            await Favorite.destroy({
                where: {
                    username: username
                }
            })
        }

        async getUserByUsername(username: string): Promise<User | null> {
            return User.findOne({
                where: {
                    username: username
                }
            });
        }

        async checkPassword(password: string, dbPass: string): Promise<boolean> {
            return await bcrypt.compare(password, dbPass);
        }

        async checkIfUserExists(username: string): Promise<boolean> {
            const user = await User.findOne({
                where: {
                    username: username
                }
            });
            return user != null;
        }
}