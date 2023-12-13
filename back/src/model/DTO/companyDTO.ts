import {StockQuoteResponse} from "../types/StockQuoteResponse";

export class CompanyDTO {
    name: string;
    symbol: string;
    stockQuote: StockQuoteResponse;
    website : string;
    favorite : boolean;

    constructor(name: string, symbol: string, stockQuote: StockQuoteResponse, website : string, favorite = false) {
        this.name = name;
        this.symbol = symbol;
        this.website = website;
        this.stockQuote = stockQuote;
        this.favorite = favorite;

    }
}
