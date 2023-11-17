import {User} from "../../model/user";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

export class UserRepository {
    private static readonly dbPath = 'src/db/stockhub.db';

    async getAllUsers(): Promise<any[]> {
        return [];
    }

    static async addUser(user: User): Promise<User> {
        const db = new sqlite3.Database(this.dbPath);
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";

        // Generate a random salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(user.password, salt);

        return new Promise<User>((resolve, reject) => {
            db.run(query, [user.username, hashedPassword], (err) => {
                db.close();
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    }


    async updateUser(user: any): Promise<any> {
        return user;
    }

    async deleteUser(id: number): Promise<void> {
        return;
    }

    static async getUserByUsername(username: string): Promise<User | null> {
        const db = new sqlite3.Database(this.dbPath);
        const query = "SELECT * FROM users WHERE username = ? LIMIT 1";


        return new Promise<User | null>((resolve, reject) => {
            db.get(query, [username], (err, row : User) => {
                db.close();
                if (err) {
                    reject(err);
                } else {
                    if (row) {
                        resolve(new User(row.username, row.password));
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
}