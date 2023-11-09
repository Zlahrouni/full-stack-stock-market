// dbHandler.ts
import sqlite3 from 'sqlite3';

export class DbHandler {
    private static dbPath = 'stockhub.db';
    private static db = new sqlite3.Database(DbHandler.dbPath);

    static getAllCompanies(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            DbHandler.db.all('SELECT * FROM stocks', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Add other functions as needed
}
