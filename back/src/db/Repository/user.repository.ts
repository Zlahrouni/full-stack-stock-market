import {User} from "../../model/user.model";
import bcrypt from "bcrypt";

export class UserRepository {
    private static readonly dbPath = 'src/db/stockhub.db';

    async getAllUsers(): Promise<User[]> {
        return User.findAll();
    }

    static async addUser(user: User): Promise<User> {
        return await User.create({
            username: user.username,
            password: await bcrypt.hash(user.password, 10)
        });
    }


    async updateUser(user: any): Promise<any> {
        return user;
    }

    async deleteUser(username: number): Promise<number> {
        return User.destroy({
            where: {
                username: username
            }
        })
    }

    static async getUserByUsername(username: string): Promise<User | null> {
        return await User.findOne({
            where: {
                username: username
            }
        });
    }
}