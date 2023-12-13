import {UserService} from "./user.service";
import {User} from "../model/user.model";
import bcrypt from "bcrypt";
import {Favorite} from "../model/favorite.model";


export class UserServiceImpl implements UserService {

        async getAllUsers(): Promise<User[]> {
            return [];
        }

        async addUser(username: string, password: string): Promise<User> {
            return await User.create({
                username: username,
                password: await bcrypt.hash(password, 10)
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

        async login(username: string, password: string): Promise<boolean> {
            return User.findOne({
                where: {
                    username: username
                }
            }).then((user) => {
                if(user == null) {
                    return false;
                }
                return bcrypt.compare(password, user.password).then((result) => {
                    return result;
                });
            });
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