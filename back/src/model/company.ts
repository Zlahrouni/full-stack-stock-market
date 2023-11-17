export class Company {
    id: number;
    name: string;
    symbol: string;
    website: string;

    constructor(id: number, name: string, symbol: string, website: string) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.website = website;
    }
}
