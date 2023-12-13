import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'favorite'
})
export class Favorite extends Model {
    @Column({ primaryKey: true, allowNull: false, type: DataType.STRING })
    declare username: string;
    @Column({ primaryKey: true, allowNull: false, type: DataType.STRING })
    declare symbol: string;
}