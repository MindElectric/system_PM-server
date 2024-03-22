import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Marca from "./Marca.model";
import Area from "./Area.model";
import Proveedor from "./Proveedor.model";
import CategoriaMaterial from "./Categoria_Material.model";

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
        type: DataType.STRING,
        allowNull: false
    })
    codigo: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    costo: number;

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

    @ForeignKey(() => Proveedor)
    @Column
    id_proveedor: number;

    @BelongsTo(() => Proveedor)
    proveedor: Proveedor;

    @ForeignKey(() => CategoriaMaterial)
    @Column
    id_categoria_material: number;

    @BelongsTo(() => CategoriaMaterial)
    categoriaMaterial: CategoriaMaterial;
}

export default Material;
