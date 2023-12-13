// sequelize.config.ts
import { Sequelize } from 'sequelize-typescript';


import {Company} from "../model/company.model";
import {User} from "../model/user.model";
import {Token} from "../model/token.model";
import {Favorite} from "../model/favorite.model";



const sequelize = new Sequelize({
    database: 'stockhub',
    dialect: 'sqlite',
    storage: 'src/db/stockhub.sqlite',
});
sequelize.addModels([User, Company, Token, Favorite]);
export { sequelize };
