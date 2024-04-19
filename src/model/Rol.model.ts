import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    tableName: 'rol',
    timestamps: false
})
class Rol extends Model {
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

export default Rol;
