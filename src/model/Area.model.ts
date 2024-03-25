import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import Material from "./Material.model";
import Usuario from "./Usuario.model";

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

    @HasMany(() => Material)
    materials: Material[];

    @HasMany(() => Usuario)
    usuarios: Usuario[];
}

export default Area;
