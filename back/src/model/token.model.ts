import {Column, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'token'
})
export class Token extends Model {
    @Column({ primaryKey: true, unique: true, allowNull: false })
    declare token: string;

    @Column({ primaryKey: true, unique: true, allowNull: false })
    declare username: string;

    @Column({ allowNull: false })
    declare expiration: Date;
}