import { Company } from "../../model/company";
import sqlite3 from 'sqlite3';

interface CompanyRow {
    id: number;
    name: string;
    symbol: string;
    website: string;
}

export class CompaniesRepository {
    private static readonly dbPath = 'src/db/stockhub.db';

    static async getAllCompanies(): Promise<Company[]> {
        const db = new sqlite3.Database(this.dbPath);

        // Placeholder query, you should replace this with your actual query
        const query = 'SELECT * FROM companies';

        return new Promise<Company[]>((resolve, reject) => {
            db.all(query, (err, rows: CompanyRow[]) => {
                db.close();
                if (err) {
                    reject(err);
                } else {
                    const companies: Company[] = rows.map(row => ({
                        id: row.id,
                        name: row.name,
                        symbol: row.symbol,
                        website: row.website
                    }));
                    resolve(companies);
                }
            });
        });
    }

    static getCompanyBySymbol(symbol: string): Promise<Company | null> {
        const db = new sqlite3.Database(this.dbPath);

        // Placeholder query, you should replace this with your actual query
        const query = "SELECT * FROM companies WHERE symbol = '" + symbol + "'";
        console.log(query);

        return new Promise<Company | null>((resolve, reject) => {
            db.all(query, (err, rows: CompanyRow[]) => {
                db.close();
                if (err) {
                    reject(err);
                } else {
                    if (rows && rows.length > 0) {
                        // Access the first element of the array
                        const company: Company = rows[0];
                        resolve(company);
                    } else {
                        // Company not found, resolve with null
                        resolve(null);
                    }
                }
            });
        });
    }

}
