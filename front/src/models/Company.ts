import StockQuoteResponse from "@/models/StockQuoteResponse.vue";

export class Company {
    name: string;
    symbol: string;
    stockQuote: StockQuoteResponse;

    constructor(name: string, symbol: string, stockQuote: Map<string, number>) {
        this.name = name;
        this.symbol = symbol;
        this.stockQuote = stockQuote;
    }

    setStockQuote(stockQuote: Map<string, number>) {
        this.stockQuote = stockQuote;
    }
}