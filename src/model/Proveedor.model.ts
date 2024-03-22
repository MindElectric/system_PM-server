import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    tableName: 'proveedor',
    timestamps: false
})
class Proveedor extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({
        type: DataType.STRING(40),
        allowNull: false
    })
    nombre: string;

    @Column({
        type: DataType.STRING(15),
        allowNull: false
    })
    telefono: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    contacto: string;
}

export default Proveedor;
