import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import Material from "./Material.model";

@Table({
    tableName: 'categoria_material',
    timestamps: false
})
class CategoriaMaterial extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare nombre: string;

    @HasMany(() => Material)
    materials: Material[];

}

export default CategoriaMaterial;
