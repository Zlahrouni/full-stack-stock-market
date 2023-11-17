// setupDatabase.ts
import * as sqlite3 from 'sqlite3';

const dbPath = '../stockhub.db';
const db = new sqlite3.Database(dbPath);

setupDatabase().then(r => console.log('Database setup complete'));

async function setupDatabase() {
    try {
        await openDb();
        await dropTables();
        await createTables();
        await insertData();
    } catch (error) {
        console.error('Error during setup:', error);
    } finally {
        closeDb();
    }
}

function openDb(): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {

            resolve();
        });
    });
}
function closeDb() {
    db.close();
}

function dropTables(): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`
            DROP TABLE IF EXISTS companies;
        `, (err) => {
            if (err) {
                reject(err);
            }
        });
        db.run(`
                    DROP TABLE IF EXISTS users;
                `, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function insertData(): Promise<void> {
    await insertCompaniesData();
}


function createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
              CREATE TABLE IF NOT EXISTS companies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                symbol TEXT NOT NULL,
                website TEXT
              );
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });

            db.run(`
              CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL
              );
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });
}


function insertCompaniesData() : Promise<void> {
    const data = [
        { name: "Apple Inc.", symbol: "AAPL", website: "https://www.apple.com/" },
        { name: "Amazon.com Inc.", symbol: "AMZN", website: "https://www.amazon.com/" },
        { name: "Facebook Inc.", symbol: "FB", website: "https://www.facebook.com/" },
        { name: "Alphabet Inc.", symbol: "GOOGL", website: "https://abc.xyz/" },
        { name: "Microsoft Corporation", symbol: "MSFT", website: "https://www.microsoft.com/" },
        { name: "Netflix Inc.", symbol: "NFLX", website: "https://www.netflix.com/" },
        { name: "Tesla Inc.", symbol: "TSLA", website: "https://www.tesla.com/" },
        { name: "Twitter Inc.", symbol: "TWTR", website: "https://twitter.com/" },
        { name: "Alibaba Group Holding Limited", symbol: "BABA", website: "https://www.alibabagroup.com/" },
        { name: "Baidu Inc.", symbol: "BIDU", website: "https://www.baidu.com/" },
        { name: "Intel Corporation", symbol: "INTC", website: "https://www.intel.com/" },
        { name: "NVIDIA Corporation", symbol: "NVDA", website: "https://www.nvidia.com/" },
        { name: "PayPal Holdings Inc.", symbol: "PYPL", website: "https://www.paypal.com/" },
        { name: "QUALCOMM Incorporated", symbol: "QCOM", website: "https://www.qualcomm.com/" },
        { name: "Adobe Inc.", symbol: "ADBE", website: "https://www.adobe.com/" },
        { name: "Cisco Systems Inc.", symbol: "CSCO", website: "https://www.cisco.com/" },
        { name: "Comcast Corporation", symbol: "CMCSA", website: "https://corporate.comcast.com/" },
        { name: "Costco Wholesale Corporation", symbol: "COST", website: "https://www.costco.com/" },
        { name: "eBay Inc.", symbol: "EBAY", website: "https://www.ebay.com/" },
        { name: "PepsiCo Inc.", symbol: "PEP", website: "https://www.pepsico.com/" },
        { name: "Starbucks Corporation", symbol: "SBUX", website: "https://www.starbucks.com/" },
        { name: "The Walt Disney Company", symbol: "DIS", website: "https://www.thewaltdisneycompany.com/" },
        { name: "Verizon Communications Inc.", symbol: "VZ", website: "https://www.verizon.com/" },
        { name: "Walmart Inc.", symbol: "WMT", website: "https://www.walmart.com/" }
    ];

    return new Promise((resolve, reject) => {
        const insertStatement = db.prepare('INSERT INTO companies (name, symbol, website) VALUES (?, ?, ?)');

        data.forEach((stock) => {
            insertStatement.run(stock.name, stock.symbol, stock.website, (err: any) => {
                if (err) reject(err);
            });
        });

        insertStatement.finalize(() => resolve());
    });

}


