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
    await insertUserData();
}


function createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
              CREATE TABLE IF NOT EXISTS companies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                symbol TEXT NOT NULL
              );
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });

            db.run(`
              CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                age INTEGER NOT NULL
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
        { name: "Apple Inc.", symbol: "AAPL" },
        { name: "Amazon.com Inc.", symbol: "AMZN" },
        { name: "Facebook Inc.", symbol: "FB" },
        { name: "Alphabet Inc.", symbol: "GOOGL" },
        { name: "Microsoft Corporation", symbol: "MSFT" },
        { name: "Netflix Inc.", symbol: "NFLX" },
        { name: "Tesla Inc.", symbol: "TSLA" },
        { name: "Twitter Inc.", symbol: "TWTR" },
        { name: "Alibaba Group Holding Limited", symbol: "BABA" },
        { name: "Baidu Inc.", symbol: "BIDU" },
        { name: "Intel Corporation", symbol: "INTC" },
        { name: "NVIDIA Corporation", symbol: "NVDA" },
        { name: "PayPal Holdings Inc.", symbol: "PYPL" },
        { name: "QUALCOMM Incorporated", symbol: "QCOM" },
        { name: "Adobe Inc.", symbol: "ADBE" },
        { name: "Cisco Systems Inc.", symbol: "CSCO" },
        { name: "Comcast Corporation", symbol: "CMCSA" },
        { name: "Costco Wholesale Corporation", symbol: "COST" },
        { name: "eBay Inc.", symbol: "EBAY" },
        { name: "Netflix Inc.", symbol: "NFLX" },
        { name: "PepsiCo Inc.", symbol: "PEP" },
        { name: "Starbucks Corporation", symbol: "SBUX" },
        { name: "Tesla Inc.", symbol: "TSLA"},
        { name: "The Walt Disney Company", symbol: "DIS" },
        { name: "Verizon Communications Inc.", symbol: "VZ" },
        { name: "Walmart Inc.", symbol: "WMT" }
    ];

    return new Promise((resolve, reject) => {
        const insertStatement = db.prepare('INSERT INTO companies (name, symbol) VALUES (?, ?)');

        data.forEach((stock) => {
            insertStatement.run(stock.name, stock.symbol, (err: any) => {
                if (err) reject(err);
            });
        });

        insertStatement.finalize(() => resolve());
    });

}

function insertUserData() : Promise<void> {
    const userData = [
        { name: "zeus", age: 999 },
        { name: "poseidon", age: 888 },

    ];

    return new Promise((resolve, reject) => {
        const insertStatement = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');

        userData.forEach((user) => {
            insertStatement.run(user.name, user.age, (err: any) => {
                if (err) reject(err);
            });
        });

        insertStatement.finalize(() => resolve());
    });
}

