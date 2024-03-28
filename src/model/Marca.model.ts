import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import Material from "./Material.model";

@Table({
    tableName: 'marca',
    timestamps: false
})
class Marca extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({
        type: DataType.STRING(50)
    })
    declare nombre: string;

    @HasMany(() => Material)
    materials: Material[];
}

export default Marca;
