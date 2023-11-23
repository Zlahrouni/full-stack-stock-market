import {Column, DataType, Model, Table} from "sequelize-typescript";


@Table({ tableName: 'company' })
export class Company extends Model{

    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare id: string;
    @Column({ allowNull: false })
    declare name: string;
    @Column({ allowNull: false })
    declare symbol: string;
    @Column({ allowNull: false })
    declare website: string;

}