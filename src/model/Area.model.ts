import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    tableName: 'area',
    timestamps: false
})
class Area extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    nombre: string;
}

export default Area;
