import {Column, Model, Table} from "sequelize-typescript";

@Table({ tableName: 'user' })
export class User extends Model{

    @Column({ primaryKey: true })
    declare username: string;
    @Column({ allowNull: false })
    declare password: string;

}