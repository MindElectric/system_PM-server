import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import Marca from "./Marca.model";
import Area from "./Area.model";
import CategoriaMaterial from "./Categoria_Material.model";
import Proveedor from "./Proveedor.model";
import MaterialProveedor from "./Material_Proveedor.model";


@Table({
    tableName: 'material',
    timestamps: false
})
class Material extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({
        type: DataType.STRING(150),
        allowNull: false
    })
    descripcion: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cantidad: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    codigo: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    costo: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    minimo: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    maximo: number;

    @ForeignKey(() => Marca)
    @Column
    id_marca: number;

    @BelongsTo(() => Marca)
    marca: Marca;

    @ForeignKey(() => Area)
    @Column
    id_area: number;

    @BelongsTo(() => Area)
    area: Area;

    @ForeignKey(() => CategoriaMaterial)
    @Column
    id_categoria_material: number;

    @BelongsTo(() => CategoriaMaterial)
    categoriaMaterial: CategoriaMaterial;

    @BelongsToMany(() => Proveedor, () => MaterialProveedor)
    proveedores: Proveedor[];
}

export default Material;