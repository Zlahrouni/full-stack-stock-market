import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';

import * as dotenv from 'dotenv';
import {CompanyService} from "../service/company.service";
import {CompanyServiceImpl} from "../service/company.service.impl";
import {UserService} from "../service/user.service";
import {UserServiceImpl} from "../service/user.service.impl";
import {sequelize} from "../db/sequelize.config";
import {Company} from "../model/Campany.model";

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private companyService!: CompanyService;
    private userService!: UserService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureDatabase()
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServices(): void {
        this.companyService = new CompanyServiceImpl();
        this.userService = new UserServiceImpl();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(this.companyService, this.userService);
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }

    private async configureDatabase(): Promise<void> {
        await sequelize.sync({ force: true });
        console.log('Database setup complete');

        // Insert default data
        await this.insertDefaultData();
    }


    private async insertDefaultData(): Promise<void> {
        try {
            const defaultCompaniesData = [
                { name: "Apple Inc.", symbol: "AAPL", website: "https://www.apple.com/" },
                { name: "Amazon.com Inc.", symbol: "AMZN", website: "https://www.amazon.com/" },
                { name: "Facebook Inc.", symbol: "FB", website: "https://www.facebook.com/" },
                { name: "Alphabet Inc.", symbol: "GOOGL", website: "https://abc.xyz/" },
                { name: "Microsoft Corporation", symbol: "MSFT", website: "https://www.microsoft.com/" },
                { name: "Netflix Inc.", symbol: "NFLX", website: "https://www.netflix.com/" },
                { name: "Tesla Inc.", symbol: "TSLA", website: "https://www.tesla.com/" },
                { name: "Twitter Inc.", symbol: "TWTR", website: "https://twitter.com/" },
                { name: "Alibaba Group Holding Limited", symbol: "BABA", website: "https://www.alibabagroup.com/" },
                { name: "Baidu Inc.", symbol: "BIDU", website: "https://www.baidu.com/" },
                { name: "Intel Corporation", symbol: "INTC", website: "https://www.intel.com/" },
                { name: "NVIDIA Corporation", symbol: "NVDA", website: "https://www.nvidia.com/" },
                { name: "PayPal Holdings Inc.", symbol: "PYPL", website: "https://www.paypal.com/" },
                { name: "QUALCOMM Incorporated", symbol: "QCOM", website: "https://www.qualcomm.com/" },
                { name: "Adobe Inc.", symbol: "ADBE", website: "https://www.adobe.com/" },
                { name: "Cisco Systems Inc.", symbol: "CSCO", website: "https://www.cisco.com/" },
                { name: "Comcast Corporation", symbol: "CMCSA", website: "https://corporate.comcast.com/" },
                { name: "Costco Wholesale Corporation", symbol: "COST", website: "https://www.costco.com/" },
                { name: "eBay Inc.", symbol: "EBAY", website: "https://www.ebay.com/" },
                { name: "PepsiCo Inc.", symbol: "PEP", website: "https://www.pepsico.com/" },
                { name: "Starbucks Corporation", symbol: "SBUX", website: "https://www.starbucks.com/" },
                { name: "The Walt Disney Company", symbol: "DIS", website: "https://www.thewaltdisneycompany.com/" },
                { name: "Verizon Communications Inc.", symbol: "VZ", website: "https://www.verizon.com/" },
                { name: "Walmart Inc.", symbol: "WMT", website: "https://www.walmart.com/" }
            ];

            await Company.bulkCreate(defaultCompaniesData);

            console.log('Default data inserted successfully.');
        } catch (error) {
            console.error('Error inserting default data:', error);
        }
    }



}