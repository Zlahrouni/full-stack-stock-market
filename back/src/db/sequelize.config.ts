// sequelize.config.ts
import { Sequelize } from 'sequelize-typescript';


import {Company} from "../model/Campany.model";
import {User} from "../model/user.model";



const sequelize = new Sequelize({
    database: 'stockhub',
    dialect: 'sqlite',
    storage: 'src/db/stockhub.sqlite',
});
sequelize.addModels([User, Company]);
export { sequelize };
