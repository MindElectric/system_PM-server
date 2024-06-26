import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsToMany } from "sequelize-typescript";
import Material from "./Material.model";
import MaterialProveedor from "./Material_Proveedor.model";

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
    declare nombre: string;

    @Column({
        type: DataType.STRING(15),
        allowNull: false
    })
    declare telefono: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare contacto: string;

    @BelongsToMany(() => Material, () => MaterialProveedor)
    materials: Material[];

}

export default Proveedor;
