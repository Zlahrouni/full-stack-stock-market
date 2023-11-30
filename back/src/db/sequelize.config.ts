// sequelize.config.ts
import { Sequelize } from 'sequelize-typescript';


import {Company} from "../model/company.model";
import {User} from "../model/user.model";
import {Token} from "../model/token.model";



const sequelize = new Sequelize({
    database: 'stockhub',
    dialect: 'sqlite',
    storage: 'src/db/stockhub.sqlite',
});
sequelize.addModels([User, Company, Token]);
export { sequelize };
