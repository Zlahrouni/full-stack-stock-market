import type { StockQuoteResponse } from "./types/StockQuoteResponse";

export class CompanyDTO {
    name: string;
    symbol: string;
    stockQuote: StockQuoteResponse;
    website: string;


    constructor(name: string, symbol: string, stockQuote: StockQuoteResponse, website: string) {
        this.name = name;
        this.symbol = symbol;
        this.stockQuote = stockQuote;
        this.website = website;
    }
}
