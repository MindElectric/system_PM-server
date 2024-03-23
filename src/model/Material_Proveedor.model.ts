import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import Proveedor from "./Proveedor.model";
import Material from "./Material.model";

@Table({
    tableName: 'material_proveedor',
    timestamps: false
})
class MaterialProveedor extends Model {
    @PrimaryKey
    @ForeignKey(() => Proveedor)
    @Column
    id_proveedor: number;

    @BelongsTo(() => Proveedor)
    proveedor: Proveedor;

    @PrimaryKey
    @ForeignKey(() => Material)
    @Column
    id_material: number;

    @BelongsTo(() => Material)
    material: Material;
}

export default MaterialProveedor;
