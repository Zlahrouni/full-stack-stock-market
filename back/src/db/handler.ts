import path from 'path';

import fs from 'fs';
import {Company} from "../model/company";

export class DbHandler {
    static filePath = path.join(__dirname, 'companies.json');

    static readJSONFile(): Company[] {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const parsedData = JSON.parse(data) as Company[];
            return parsedData || [];
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return [];
        }
    }

}