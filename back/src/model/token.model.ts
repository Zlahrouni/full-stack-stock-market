import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'token'
})
export class Token extends Model {
    @Column({ primaryKey: true, unique: true, allowNull: false, type: DataType.STRING })
    declare token: string;

    @Column({ primaryKey: true, allowNull: false, type: DataType.STRING })
    declare username: string;

    @Column({ allowNull: false })
    declare expiration: Date;
}