import type { StockQuoteResponse } from "./types/StockQuoteResponse";

export class CompanyDTO {
    name: string;
    symbol: string;
    stockQuote: StockQuoteResponse;

    constructor(name: string, symbol: string, stockQuote: StockQuoteResponse) {
        this.name = name;
        this.symbol = symbol;
        this.stockQuote = stockQuote;
    }
}
