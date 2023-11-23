import {Column, Model, Table} from "sequelize-typescript";

@Table
export class User extends Model<User>{

    @Column({ primaryKey: true })
    declare username: string;
    @Column({ allowNull: false })
    declare password: string;

}