import type {StockQuoteResponse} from "@/models/StockQuoteResponse.vue";


export class Company {
    name: string;
    symbol: string;
    stockQuote: StockQuoteResponse;

    constructor(name: string, symbol: string, stockQuote: StockQuoteResponse) {
        this.name = name;
        this.symbol = symbol;
        this.stockQuote = stockQuote;
    }

}