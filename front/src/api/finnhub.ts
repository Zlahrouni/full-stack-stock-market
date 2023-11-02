import axios from 'axios';
import type { StockQuoteResponse } from "@/models/StockQuoteResponse.vue";

const apiKey = 'ckvp05hr01qq199j4hr0ckvp05hr01qq199j4hrg';

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
