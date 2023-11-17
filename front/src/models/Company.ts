import type {StockQuoteResponse} from "@/models/StockQuoteResponse.vue";


export class Company {
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