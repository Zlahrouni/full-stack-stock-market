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



    // Static method to find a company by symbol
    static async findBySymbol(symbol: string): Promise<Company | null> {
        return Company.findOne({
            where: {
                symbol: symbol,
            },
        });
    }

    // Instance method to convert the company to a string
    toString(): string {
        return `Company { id: ${this.id}, name: ${this.name}, symbol: ${this.symbol}, website: ${this.website} }`;
    }
}