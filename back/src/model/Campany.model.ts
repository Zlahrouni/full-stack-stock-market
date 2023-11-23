import {Column, Model, Table} from "sequelize-typescript";


@Table({ tableName: 'company' })
export class CompanyModel extends Model<CompanyModel>{

    @Column({ primaryKey: true })
    declare id: string;
    @Column({ allowNull: false })
    declare name: string;
    @Column({ allowNull: false })
    declare symbol: string;
    @Column({ allowNull: false })
    declare website: string;

}