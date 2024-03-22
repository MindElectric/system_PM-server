import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

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
    nombre: string;
}

export default CategoriaMaterial;
