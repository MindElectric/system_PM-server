import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import Usuario from "./Usuario.model";
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
    declare nombre: string;

    @HasMany(() => Usuario)
    usuarios: Usuario[];
}

export default Rol;
