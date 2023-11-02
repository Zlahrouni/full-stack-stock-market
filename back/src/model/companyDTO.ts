import {StockQuoteResponse} from "./StcokQuoteResponse";

export interface CompanyDTO {
    name: string;
    symbol: string;
    stockQuote: StockQuoteResponse;
}
