import { Company } from "../../model/company";
import sqlite3 from 'sqlite3';

interface CompanyRow {
    id: number;
    name: string;
    symbol: string;
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
                        symbol: row.symbol
                    }));
                    resolve(companies);
                }
            });
        });
    }

    static getCompanyById(id: number): Company | undefined {
        // Implementation...
        return undefined;
    }
}
