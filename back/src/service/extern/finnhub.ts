import axios from 'axios';
import {StockQuoteResponse} from "../../model/types/StockQuoteResponse";


const apiKey = process.env.FINNHUB_API_KEY;


export async function getStockQuote(symbol: string): Promise<StockQuoteResponse> {
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
            params: {
                symbol,
                token: apiKey,
            },
        });

        return response.data;
        // Process the stock quote data here
    } catch (error) {
        console.error('Error:', error);
        return {
            c: 0,
            pc: 0,
            h: 0,
            l: 0,
            o: 0,
            t: 0,
        };
    }
}
